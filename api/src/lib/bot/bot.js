import { db } from 'src/lib/db'
import { v4 as uuidv4 } from 'uuid'
import { LOGIN_URL, DISCORD_INITIAL_AUTH } from 'src/lib/bot/constants'

export const handleMessage = async ({
  content,
  platformUserId,
  platform,
  guildId,
}) => {
  // TODO: is this always an invocation?
  // Create the user in the database
  const ephemeralId = uuidv4()
  const user = await db.user.upsert({
    where: { platformId: platformUserId },
    create: {
      platformId: platformUserId,
      platform,
      currentSessionGuild: {
        connect: { platformId: guildId },
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
