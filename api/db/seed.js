/* eslint-disable no-console */
const { PrismaClient } = require('@prisma/client')
const dotenv = require('dotenv')
const fetch = require('node-fetch')
const API_ENDPOINT = 'https://discord.com/api/v9'

const getDiscordInviteUrl = async (serverId) => {
  const data = await fetch(`${API_ENDPOINT}/guilds/${serverId}/invites`, {
    headers: {
      method: 'GET',
      Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json())
  // NOTE: Its possible that there are no invite links for a server!
  if (!data || !data.length) {
    if (data.message) return data.message
    if (!data.length) return '(no invites)'
    return JSON.stringify(data)
  }

  const { code } = data[0]
  return `https://discord.com/invite/${code}`
}

dotenv.config()
const db = new PrismaClient()

async function main() {
  console.warn('Getting server invite URLs.....')
  const guilds = await db.guild.findMany()
  const sorted = guilds.sort((a, b) => a.name.localeCompare(b.name))
  for (var i = 0; i < sorted.length; i++) {
    await setTimeout(async () => {}, 300)
    const inviteUrl = await getDiscordInviteUrl(sorted[i].id)
    const users = await db.guild
      .findUnique({ where: { id: sorted[i].id } })
      .users()
    console.log(
      `${i}. (${users.length} users) ${sorted[i].name} - ${inviteUrl}`
    )
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await db.$disconnect()
  })
