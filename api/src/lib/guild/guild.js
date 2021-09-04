import Discord from 'discord.js'

import { db } from 'src/lib/db'

const client = new Discord.Client()

export const fetchGuild = async (guildId) => {
  await client.login(process.env.DISCORD_TOKEN)
  await client.once('ready', async () => {
    console.log('Ready!')
    console.log(guildId)
    const guildData = client.guilds.cache.get(guildId)
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
  })
}
