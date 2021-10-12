import { AuthenticationError, EnvelopError } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'
import { v4 as uuidv4 } from 'uuid'
import { fetchGuild } from 'src/lib/guild'
import { getUnlockPaywallUrl, getUnlockMessage } from 'src/lib/web3/unlock'
import { recoverPersonalSignature } from 'eth-sig-util'
import { bufferToHex } from 'ethereumjs-util'

import {
  getDiscordOauthURL,
  getDiscordAccessTokenFromCode,
  getDiscordProfile,
  getDiscordInviteUrl,
  verifyDiscordServerManager,
  deleteMessage,
} from 'src/lib/discord'
import { DISCORD_INITIAL_AUTH, AVATAR_BASE_URL } from 'src/lib/bot/constants'
import { TOKEN_TYPES } from 'src/lib/role/constants'
import { syncUserRole } from 'src/lib/role'

const onlyRolesWithUnlock = async (roles) => {
  let rolesWithUnlock = []
  await Promise.all(
    roles.map(async (role) => {
      const tokens = await db.role
        .findUnique({ where: { id: role.id } })
        .tokens()
      const tokensWithUnlock = tokens.filter(
        (token) => token.type == TOKEN_TYPES.UNLOCK
      )
      if (tokensWithUnlock.length)
        rolesWithUnlock.push({ ...role, tokens: tokensWithUnlock })
    })
  )
  return rolesWithUnlock
}

const getRolesWithTokens = async (roles) =>
  await Promise.all(
    roles.map(async (role) => {
      const tokens = await db.role
        .findUnique({ where: { id: role.id } })
        .tokens()
      return { ...role, tokens }
    })
  )

export const handleMessage = async ({
  userId,
  platform,
  guild: guildObject,
}) => {
  const oauthState = uuidv4()
  // Create the guild if it doesn't exist
  const guild = await fetchGuild(guildObject)
  // Create the user in the database
  await db.user.upsert({
    where: { id: userId },
    create: {
      id: userId,
      platform,
      currentSessionGuild: {
        connect: { id: guild.id },
      },
      guilds: {
        connect: { id: guild.id },
      },
      oauthState,
    },
    update: {
      currentSessionGuild: {
        connect: { id: guild.id },
      },
      guilds: {
        connect: { id: guild.id },
      },
      oauthState,
    },
  })
  // Return the unique URL for the response
  return {
    text: DISCORD_INITIAL_AUTH + getDiscordOauthURL(oauthState),
    type: 'reply',
    url: null,
  }
}

export const handleOauthCodeGrant = async ({
  oauthState,
  code,
  type,
  // signature and userId are only available unlock oauth
  signature,
  userId,
}) => {
  if (type === 'unlock') {
    // User is coming from purchase on Unlock Protocol
    const user = await db.user.findUnique({ where: { id: userId } })
    // If the oauthState matches then this is *probably* the same user ;)
    // How can this be attacked?
    if (!user.oauthState) {
      throw new Error('State is invalid. Please restart')
    }
    const messageToSign = getUnlockMessage(user.oauthState, user.id)
    const signerAddressRaw = recoverPersonalSignature({
      data: bufferToHex(Buffer.from(messageToSign, 'utf8')),
      sig: signature,
    })
    const signerAddress = signerAddressRaw.toLowerCase()
    try {
      await db.user.update({
        where: { id: user.id },
        data: {
          address: signerAddress,
          oauthState: null, // Done with the flow
        },
      })
    } catch (e) {
      throw new EnvelopError(
        `Woops! It looks like this wallet may already be connected to another Discord account. ${e}`
      )
    }

    const currentSessionGuildRoles = await db.user
      .findUnique({ where: { id: user.id } })
      .currentSessionGuild()
      .roles()
    const rolesWithUnlock = await onlyRolesWithUnlock(currentSessionGuildRoles)
    const role = rolesWithUnlock[0]

    // Give the appropriate role
    const hasRole = await syncUserRole({ role, user })
    if (!hasRole)
      throw new EnvelopError(
        `Sorry, it doesn't look like you purchased a lock. Wallet address: ${
          user.address
        }, Locks:${role.tokens.map(
          (token) =>
            ` Address: ${token.contractAddress} Network: ${token.chainId}`
        )}`
      )
    // Redirect back to discord
    const inviteUrl = await getDiscordInviteUrl(role.guildId)
    return [
      {
        url: inviteUrl,
      },
    ]
  } else if (type === 'discord') {
    // User is coming from Discord
    const tokenData = await getDiscordAccessTokenFromCode(code)
    const { accessToken, refreshToken, expiration } = tokenData
    if (!accessToken)
      throw new AuthenticationError('Discord OAuth2 code invalid')
    const profile = await getDiscordProfile(accessToken)
    // Fetch user and validate state
    const user = await db.user.findUnique({ where: { id: profile.id } })
    const [channelId, messageId] = user.promptMessageId.split('-')
    await deleteMessage(channelId, messageId)
    if (user.oauthState !== oauthState)
      throw new AuthenticationError(
        `You are signed into Discord as "${user.username}" in this browser. handleOauthCodeGrant() oauthState does not match. `
      )
    // Save the Discord auth credentials and update state
    const newOauthState = uuidv4()
    await db.user.update({
      where: { id: profile.id },
      data: {
        iconUrl: `${AVATAR_BASE_URL}${profile.id}/${profile.avatar}.png`,
        username: profile.username,
        oauthState: newOauthState,
        discordAuth: {
          upsert: {
            create: {
              accessToken,
              refreshToken,
              expiration,
            },
            update: {
              accessToken,
              refreshToken,
              expiration,
            },
          },
        },
      },
    })

    const currentSessionGuildRoles = await db.user
      .findUnique({ where: { id: profile.id } })
      .currentSessionGuild()
      .roles()
    const rolesWithTokens = await getRolesWithTokens(currentSessionGuildRoles)

    let redirectOptions = []
    const currentSessionGuild = await db.user
      .findUnique({ where: { id: profile.id } })
      .currentSessionGuild()

    rolesWithTokens.map((role) => {
      const tokensWithUnlock = role.tokens.filter(
        (token) => token.type == TOKEN_TYPES.UNLOCK
      )
      // Role is not using Unlock protocol
      if (!tokensWithUnlock.length) {
        return redirectOptions.push({
          roleName: role.name,
          text: 'ERC20 or ERC721 token',
          url: `/login?state=${newOauthState}&id=${profile.id}`,
        })
      }
      // Role is using Unlock, so only give the paywall option
      redirectOptions.push({
        roleName: role.name,
        text: 'Unlock Protocol',
        url: getUnlockPaywallUrl({
          tokens: tokensWithUnlock,
          roleName: role.name,
          userId: profile.id,
          oauthState: newOauthState,
          guild: currentSessionGuild,
        }),
      })
    })

    // If the user is the server manager, give the option to see the dashboard
    const isUserManager = await verifyDiscordServerManager(
      currentSessionGuild.id,
      profile.id
    )
    if (isUserManager)
      redirectOptions.push({
        text: `Server admin tools`,
        url: `/login?state=${newOauthState}&id=${profile.id}`,
      })
    return redirectOptions
  } else {
    throw 'handleOauthCodeGrant() No type provided or invalid type'
  }
}

export const handleUpdatePromptMessageId = async ({
  userId,
  promptMessageId,
}) => {
  await db.user.update({
    where: { id: userId },
    data: {
      promptMessageId,
    },
  })
  return 'success'
}
