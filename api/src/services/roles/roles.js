import { db } from 'src/lib/db'
import { requireAuth } from 'src/lib/auth'
import { syncUserRole } from 'src/lib/role'

// Used when the environment variable REDWOOD_SECURE_SERVICES=1
export const beforeResolver = (rules) => {
  rules.add(requireAuth)
}

export const syncRole = async ({ id }) => {
  const role = await db.role.findUnique({ where: { id } })
  const userHasRole = await syncUserRole({ user: context.currentUser, role })
  if (!userHasRole)
    throw new Error("Sorry you don't have the right tokens in your wallet")
  return role
}

export const role = async ({ id }) => {
  const role = await db.role.findUnique({ where: { id } })
  const userRoles = await db.user
    .findUnique({ where: { id: context.currentUser.id } })
    .roles()
  const userHasRole = userRoles.map((role) => role.id).includes(id)
  return { ...role, userHasRole }
}

export const Role = {}
