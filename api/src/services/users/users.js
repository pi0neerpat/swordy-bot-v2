import { db } from 'src/lib/db'
import { requireAuth } from 'src/lib/auth'

// Used when the environment variable REDWOOD_SECURE_SERVICES=1
export const beforeResolver = (rules) => {
  rules.add(requireAuth)
}

export const users = () => {
  return db.user.findMany()
}

export const user = ({ address }) => {
  return db.user.findUnique({
    where: { address },
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
