import { db } from 'src/lib/db'
import { requireAuth, getCurrentUser } from 'src/lib/auth'
import { UserInputError } from '@redwoodjs/api'

const verifyOwnership = (name, { id }) => {
  if (context.currentUser.id !== id) {
    throw new UserInputError('User does not own this user data')
  }
}

// Used when the environment variable REDWOOD_SECURE_SERVICES=1
export const beforeResolver = (rules) => {
  rules.add(requireAuth)
  rules.add(() => requireAuth({ roles: ['admin'] }), { only: ['users'] })
  rules.add(verifyOwnership, { only: ['user'] })
}

export const users = () => {
  return db.user.findMany()
}

export const ownProfile = () => {
  return db.user.findUnique({
    where: { id: context.currentUser.id },
  })
}

export const User = {
  authDetail: (_obj, { root }) =>
    db.user.findUnique({ where: { id: root.id } }).authDetail(),
  guilds: (_obj, { root }) =>
    db.user.findUnique({ where: { id: root.id } }).guilds(),
  roles: (_obj, { root }) =>
    db.user.findUnique({ where: { id: root.id } }).roles(),
  currentSessionGuild: (_obj, { root }) =>
    db.user.findUnique({ where: { id: root.id } }).currentSessionGuild(),
}
