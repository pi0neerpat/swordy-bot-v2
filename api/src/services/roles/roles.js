import { db } from 'src/lib/db'
import { syncUserRole } from 'src/lib/role'
import { getDiscordServerRoles } from 'src/lib/discord'
import { addRoleForUser } from 'src/lib/discord'
import { EnvelopError } from '@envelop/core'

export const addRoleToken = async ({
  guildId,
  roleId,
  contractAddress,
  chainId,
  type,
  tokenId,
}) => {
  // Fetch name from Discord API
  const discordRoles = await getDiscordServerRoles(guildId)
  const discordRole = discordRoles.filter((role) => role.id === roleId)[0]
  // Check the bot has a role high enough to manage this role
  await addRoleForUser(guildId, roleId, context.currentUser.id)
  const role = await db.role.upsert({
    where: { id: roleId },
    update: {
      tokens: { create: { contractAddress, chainId, type, tokenId } },
    },
    create: {
      id: roleId,
      name: discordRole.name,
      guild: { connect: { id: guildId } },
      tokens: { create: { contractAddress, chainId, type, tokenId } },
    },
  })
  return role
}

export const removeRoleToken = async ({ roleId, tokenId }) => {
  const role = await db.role.update({
    where: { id: roleId },
    data: {
      tokens: {
        delete: { id: tokenId },
      },
    },
  })
  const tokens = await db.role
    .findUnique({
      where: { id: roleId },
    })
    .tokens()
  // If no more tokens, delete the role completely
  if (!tokens.length) await db.role.delete({ where: { id: roleId } })
  return role
}

export const syncRole = async ({ id }) => {
  const tokens = await db.role.findUnique({ where: { id } }).tokens()
  const role = await db.role.findUnique({ where: { id } })
  const userHasRole = await syncUserRole({
    user: context.currentUser,
    role: { tokens, ...role },
  })
  if (!userHasRole)
    throw new EnvelopError(
      "Sorry you don't have the right tokens in your wallet"
    )
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
