import { db } from 'src/lib/db'

export const fetchGuild = async (guildObject) => {
  if (!guildObject) throw 'No guildObject provided for fetchGuild'
  let guild = await db.guild.upsert({
    where: { id: guildObject.id },
    create: {
      id: guildObject.id,
      platform: 'discord',
      name: guildObject.name,
      iconUrl: guildObject.iconURL,
      description: guildObject.description,
    },
    update: {
      id: guildObject.id,
      platform: 'discord',
      name: guildObject.name,
      iconUrl: guildObject.iconURL,
      description: guildObject.description,
    },
  })
  return guild
}
