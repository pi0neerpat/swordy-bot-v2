import { db } from 'src/lib/db'
import { requireAuth, verifyManager } from 'src/lib/auth'
import { syncUserRole } from 'src/lib/role'
import { getDiscordServerRoles } from 'src/lib/discord'

// Used when the environment variable REDWOOD_SECURE_SERVICES=1
export const beforeResolver = (rules) => {
  rules.add(requireAuth)
  rules.add(verifyManager, {
    only: ['addRoleToken', 'removeRoleToken'],
  })
}

export const addRoleToken = async ({
  guildId,
  roleId,
  contractAddress,
  chainId,
  type,
}) => {
  // Fetch name from Discord API
  console.log(guildId)
  const discordRoles = await getDiscordServerRoles(guildId)
  const discordRole = discordRoles.filter((role) => role.id === input.id)[0]
  const role = await db.role.upsert({
    where: { id: roleId },
    update: {
      tokens: { create: { contractAddress, chainId, type } },
    },
    create: {
      id: roleId,
      name: discordRole.name,
      guild: { connect: { id } },
      tokens: { create: { contractAddress, chainId, type } },
    },
  })
}

export const removeRoleToken = ({ id, roleId, tokenId }) => {
  const role = db.role.update({
    where: { id: roleId },
    data: {
      tokens: {
        delete: { id: tokenId },
      },
    },
  })
  console.log(role)
  // If necessary, delete the role completely
  return role
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
  const tokens = await db.role.findUnique({ where: { id } }).tokens()
  const userRoles = await db.user
    .findUnique({ where: { id: context.currentUser.id } })
    .roles()
  const userHasRole = userRoles.map((role) => role.id).includes(id)
  return { ...role, userHasRole, tokens }
}

export const Role = {}
