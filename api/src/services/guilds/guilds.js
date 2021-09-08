import { db } from 'src/lib/db'
import { requireAuth } from 'src/lib/auth'

import { UserInputError } from '@redwoodjs/api'

const verifyOwnership = async (name, { id }) => {
  const guild = await db.guild.findUnique({ where: id })
  // TODO: check the user has admin rights in the guild
  // if (context.currentUser.id !== id) {
  //   throw new UserInputError('User does not own this user data')
  // }
}

// Used when the environment variable REDWOOD_SECURE_SERVICES=1
export const beforeResolver = (rules) => {
  rules.add(requireAuth)
  rules.add(verifyOwnership, { only: ['updateGuild'] })
}

export const guilds = () => {
  return db.guild.findMany()
}

export const guild = ({ id }) => {
  return db.guild.findUnique({
    where: { id },
  })
}

export const addGuildRole = async ({ id, input }) => {
  const guild = await db.guild.findUnique({ where: id })
  const role = fetchRole({ guild, role: input.role, token: input.token })
  return db.guild.update({
    data: input,
    where: { id },
  })
}

export const Guild = {
  roles: (_obj, { root }) =>
    db.guild.findUnique({ where: { id: root.id } }).roles(),
  // Warning: Intentionally blocking these so user data cannot be accessed
  // users: (_obj, { root }) =>
  //   db.guild.findUnique({ where: { id: root.id } }).users(),
  // User: (_obj, { root }) =>
  //   db.guild.findUnique({ where: { id: root.id } }).User(),
}
