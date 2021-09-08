import Discord from 'discord.js'

import { db } from 'src/lib/db'

const client = new Discord.Client()

// const url = `https://discord.com/api/v9/guilds/${guildId}`
// const res = await fetch(url, {
//   method: 'GET',
//   headers: {
//     Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
//     'Content-Type': 'application/json',
//   },
// })
// const guildData = await res.text()
// console.log(url)
// console.log(guildData)
//
// await client.login(process.env.DISCORD_TOKEN)
//
// return await client.on('ready', async () => {
//   console.log('Ready!')
//   console.log(guildId)
//   const res = await client.api.guilds(guildId)
//   console.log(res)
// })

export const fetchGuild = async (guildObject) => {
  if (!guildObject) throw 'No guildObject provided for fetchGuild'
  let guild = await db.guild.findUnique({
    where: { id: guildObject.id },
  })
  if (!guild)
    guild = await db.guild.create({
      data: {
        id: guildObject.id,
        platform: 'discord',
        name: guildObject.name,
        iconUrl: guildObject.iconURL,
        description: guildObject.description,
      },
    })
  return guild
}
