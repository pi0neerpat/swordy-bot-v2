import Discord from 'discord.js'

import { db } from 'src/lib/db'

const client = new Discord.Client()

export const fetchGuild = async (guildId) => {
  const res = await fetch(`https://discord.com/api/v8/guilds/${guildId}`, {
    headers: {
      Authorization: `Bot ${process.env.DISCORD_CLIENT_TOKEN}`,
      'Content-Type': 'application/json',
    },
  })
  const guildData = await res.text()

  // const guildData = await client.guilds.cache.get(guildId)
  if (!guildData) throw "This guild doesn't exist on Discord"
  console.log(guildData)
  let guild = await db.guild.findUnique({ where: { platformId: guildId } })
  if (!guild)
    guild = await db.guild.create({
      data: {
        platformId: guildId,
        platform: 'discord',
        name: guildData.name,
        iconUrl: guildData.icon,
        description: guildData.description,
      },
    })
  return guild
}
