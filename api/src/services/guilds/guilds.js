import { db } from 'src/lib/db'
import { requireAuth } from 'src/lib/auth'
import {
  getDiscordServerRoles,
  fetchDiscordAccessToken,
  verifyDiscordServerManager,
} from 'src/lib/discord'

import { AuthenticationError } from '@redwoodjs/api'

const verifyManager = async (name, { id }) => {
  const isUserManager = await verifyDiscordServerManager(
    id,
    context.currentUser.id
  )
  if (!isUserManager) {
    throw new AuthenticationError(
      'You do not have the appropriate permissions to manage roles for this server'
    )
  }
}

// Used when the environment variable REDWOOD_SECURE_SERVICES=1
export const beforeResolver = (rules) => {
  rules.add(requireAuth)
  rules.add(verifyManager, {
    only: ['addGuildRole', 'removeGuildRole', 'guildDiscordRoles'],
  })
}

export const guilds = () => {
  return db.guild.findMany()
}

export const guild = async ({ id }) => {
  const isUserManager = await verifyDiscordServerManager(
    id,
    context.currentUser.id
  )
  const guild = await db.guild.findUnique({
    where: { id },
  })
  return { isUserManager, ...guild }
}

export const guildDiscordRoles = async ({ id }) => {
  const serverRoles = await getDiscordServerRoles(id)
  const roles = await db.guild.findUnique({ where: { id } }).roles()
  const roleIds = roles.map((role) => role.id)
  // Remove the roles that are already token-gated
  return serverRoles.filter((role) => !roleIds.includes(role.id))
}

export const addGuildRole = async ({ id, input }) => {
  // Name must come from Discord
  const roles = await getDiscordServerRoles(id)
  const role = roles.filter((role) => role.id === input.id)[0]
  return db.guild.update({
    where: { id },
    data: { roles: { create: { name: role.name, ...input } } },
  })
}

export const removeGuildRole = ({ id, roleId }) => {
  return db.guild.update({
    where: { id },
    data: { roles: { delete: [{ id: roleId }] } },
  })
}

export const Guild = {
  roles: (_obj, { root }) =>
    db.guild.findUnique({ where: { id: root.id } }).roles(),
}
