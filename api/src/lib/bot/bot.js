import { AuthenticationError } from '@redwoodjs/api'

import { db } from 'src/lib/db'
import { v4 as uuidv4 } from 'uuid'
import { fetchGuild } from 'src/lib/guild'
import { getUnlockPaywallUrl } from 'src/lib/web3/unlock'
import {
  getDiscordOauthURL,
  getDiscordAccessTokenFromCode,
  getDiscordProfile,
  getDiscordInviteUrl,
} from 'src/lib/discord'
import { getUnlockMessage } from 'src/services/ethereumAuth'
import {
  LOGIN_URL,
  DISCORD_INITIAL_AUTH,
  AVATAR_BASE_URL,
} from 'src/lib/bot/constants'
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
export const handleMessage = async ({
  content,
  userId,
  platform,
  guildId,
  guild: guildObject,
}) => {
  // TODO: is this always an invocation?
  const oauthState = uuidv4()

  // Create the guild if it doesn't exist
  const guild = await fetchGuild(guildObject)

  // Create the user in the database
  const user = await db.user.upsert({
    where: { id: userId },
    create: {
      id: userId,
      platform,
      currentSessionGuild: {
        connect: { id: guild.id },
      },
      oauthState,
    },
    update: {
      currentSessionGuild: {
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
  signedMessage,
}) => {
  if (type === 'unlock') {
    // User is coming from purchase on Unlock Protocol
    // Finding user by oauthState feels wrong.... But I think its still secure :P
    const user = await db.user.findUnique({ where: { oauthState } })
    const signerAddress = recoverPersonalSignature({
      data: bufferToHex(
        Buffer.from(getUnlockMessage(oauthState, user.id), 'utf8')
      ),
      sig: signature,
    })
    await db.user.update({
      where: { id: user.id },
      data: {
        address: signerAddress,
        oauthState: null, // Done with the flow
      },
    })

    const currentSessionGuildRoles = await db.user
      .findUnique({ where: { id: profile.id } })
      .currentSessionGuild()
      .roles()
    const rolesWithUnlock = await onlyRolesWithUnlock(currentSessionGuildRoles)
    const role = rolesWithUnlock[0]

    // Give the appropriate role
    const hasRole = await syncUserRole({ role, user })
    if (!hasRole)
      throw new Error("Sorry, it doesn't look like you purchases a lock.")
    // Redirect back to discord
    const inviteUrl = await getDiscordInviteUrl(role.guildId)
    return (window.location = inviteUrl)
  } else if (type === 'discord') {
    // User is coming from Discord
    const tokenData = await getDiscordAccessTokenFromCode(code)
    const { accessToken, refreshToken, expiration } = tokenData
    if (!accessToken)
      throw new AuthenticationError('Discord OAuth2 code invalid')
    const profile = await getDiscordProfile(accessToken)
    // Fetch user and validate state
    const user = await db.user.findUnique({ where: { id: profile.id } })
    if (user.oauthState !== oauthState)
      throw 'handleOauthCodeGrant() oauthState does not match'
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
    const rolesWithUnlock = await onlyRolesWithUnlock(currentSessionGuildRoles)

    if (rolesWithUnlock.length) {
      // Redirect to Unlock flow
      const { tokens, name: roleName } = rolesWithUnlock[0] // Just pick the first one, my guy
      const currentSessionGuild = await db.user
        .findUnique({ where: { id: profile.id } })
        .currentSessionGuild()
      return {
        url: getUnlockPaywallUrl({
          tokens,
          roleName,
          userId: profile.id,
          oauthState: newOauthState,
          guild: currentSessionGuild,
        }),
      }
    } else {
      // Redirect to Ethereum auth
      return {
        url: `/login?state=${newOauthState}&id=${profile.id}`,
      }
    }
  } else {
    throw 'handleOauthCodeGrant() No type provided or invalid type'
  }
}
