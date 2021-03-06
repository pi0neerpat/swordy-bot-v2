import { db } from 'src/lib/db'

import {
  getDiscordServerRoles,
  verifyDiscordServerManager,
} from 'src/lib/discord'

export const guildStats = () => {
  return db.guild.findMany({
    take: 100,
    // include: {
    //   _count: { roles: true },
    //
    //   // _count: {
    //   //   select: { users: true },
    //   // },
    // },
    // orderBy: {
    //   _count: {
    //     users: 'desc',
    //   },
    // },
  })
}

export const guildCount = async () => {
  const { _all } = await db.guild.count({
    select: {
      _all: true, // Count all records
    },
  })
  return _all
}

export const guild = async ({ guildId }) => {
  const isUserManager = await verifyDiscordServerManager(
    guildId,
    context.currentUser.id
  )

  const guild = await db.guild.findUnique({
    where: { id: guildId },
  })
  return { isUserManager, ...guild }
}

export const guildDiscordRoles = async ({ guildId }) => {
  const serverRoles = await getDiscordServerRoles(guildId)
  const roles = await db.guild.findUnique({ where: { id: guildId } }).roles()
  const roleIds = roles.map((role) => role.id)
  // Remove the roles that are already token-gated
  return serverRoles.filter((role) => !roleIds.includes(role.id))
}

export const Guild = {
  roles: (_obj, { root }) =>
    db.guild.findUnique({ where: { id: root.id } }).roles(),
}
