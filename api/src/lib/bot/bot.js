import { db } from 'src/lib/db'
import { v4 as uuidv4 } from 'uuid'
import { fetchGuild } from 'src/lib/guild'
import {
  getDiscordOauthURL,
  getDiscordAccessToken,
  getDiscordProfile,
} from 'src/lib/discord'

import { LOGIN_URL, DISCORD_INITIAL_AUTH } from 'src/lib/bot/constants'

export const handleMessage = async ({
  content,
  platformUserId,
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
    where: { platformId: platformUserId },
    create: {
      platformId: platformUserId,
      platform,
      currentSessionGuild: {
        connect: { platformId: guild.platformId },
      },
      oauthState,
    },
    update: {
      currentSessionGuild: {
        connect: { platformId: guild.platformId },
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
  if (type === 'discord') {
    const accessToken = await getDiscordAccessToken(code)
    if (!accessToken)
      throw 'Oauth access not valid or has already been used. Please restart the flow in Discord'
    const profile = await getDiscordProfile(accessToken)

    // Fetch user by platformId and validate state
    const user = await db.user.findUnique({ where: { platformId: profile.id } })
    if (user.oauthState !== oauthState)
      throw 'handleOauthCodeGrant() oauthState does not match'

    const newOauthState = uuidv4()
    // Direct the user to
    await db.user.update({
      where: { platformId: profile.id },
      data: {
        oauthState: newOauthState,
      },
    })

    // Redirect to Ethereum auth
    return {
      url: `/login?state=${oauthState}&platformId=${profile.id}`,
    }
  } else {
    throw 'handleOauthCodeGrant() No type provided or invalid type'
  }
}
