import { db } from 'src/lib/db'
import { requireAuth } from 'src/lib/auth'

// Used when the environment variable REDWOOD_SECURE_SERVICES=1
export const beforeResolver = (rules) => {
  rules.add(requireAuth)
}

export const tokens = () => {
  return db.token.findMany()
}

export const Token = {
  Role: (_obj, { root }) =>
    db.token.findUnique({ where: { id: root.id } }).Role(),
}
