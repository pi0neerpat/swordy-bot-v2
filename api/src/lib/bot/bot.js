import { db } from 'src/lib/db'
import { v4 as uuidv4 } from 'uuid'
import { fetchGuild } from 'src/lib/guild'

import { LOGIN_URL, DISCORD_INITIAL_AUTH } from 'src/lib/bot/constants'

export const handleMessage = async ({
  content,
  platformUserId,
  platform,
  guildId,
}) => {
  // TODO: is this always an invocation?
  const ephemeralId = uuidv4()

  // Create the guild if it doesn't exist
  const guild = await fetchGuild(guildId)

  // Create the user in the database
  const user = await db.user.upsert({
    where: { platformId: platformUserId },
    create: {
      platformId: platformUserId,
      platform,
      currentSessionGuild: {
        connect: { platformId: guild.id },
      },
      ephemeralId,
    },
    update: {
      currentSessionGuild: {
        connect: { platformId: guildId },
      },
      ephemeralId,
    },
  })
  // Return the unique URL for the response
  return {
    text: DISCORD_INITIAL_AUTH + LOGIN_URL + ephemeralId,
    type: 'reply',
    url: null,
  }
}
