import { AuthenticationError } from '@redwoodjs/api'

import { db } from 'src/lib/db'
import { v4 as uuidv4 } from 'uuid'
import { fetchGuild } from 'src/lib/guild'
import {
  getDiscordOauthURL,
  getDiscordAccessTokenFromCode,
  getDiscordProfile,
} from 'src/lib/discord'

import {
  LOGIN_URL,
  DISCORD_INITIAL_AUTH,
  AVATAR_BASE_URL,
} from 'src/lib/bot/constants'

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

export const handleOauthCodeGrant = async ({ oauthState, code, type }) => {
  if (type === 'unlock') {
    // User is coming from purchase on Unlock Protocl
    // TODO: Verify the unlock was completed
    throw "Unlock isn't implemented yet"
  }
  if (type === 'discord') {
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

    // TODO: Check currentSessionGuild for where to redirect the user
    // Either: 1) login here, or 2) purchase lock from unlockprotocol.com

    // Redirect to Ethereum auth
    return {
      url: `/login?state=${newOauthState}&id=${profile.id}`,
    }
  } else {
    throw 'handleOauthCodeGrant() No type provided or invalid type'
  }
}
