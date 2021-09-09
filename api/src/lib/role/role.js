import { db } from 'src/lib/db'
import { TOKEN_TYPES } from 'src/lib/role/constants'
import { checkNftBalance } from 'src/lib/web3/token'
import { checkUnlockBalance } from 'src/lib/web3/unlock'

export const syncUserRole = async ({ user, role }) => {
  let userHasRole = false
  const { type, chainId, contractAddress } = role
  const { address: userAddress } = user
  // TODO: check wallet token balance
  userHasRole = true
  try {
    if (type === TOKEN_TYPES.ERC721) {
      userHasRole = await checkNftBalance({
        userAddress,
        contractAddress,
        chainId,
      })
    } else if (type === TOKEN_TYPES.UNLOCK) {
      userHasRole = await checkUnlockBalance({
        userAddress,
        contractAddress,
        chainId,
      })
    }
  } catch (e) {
    // Break to prevent deleting a role from a user unnecessarily
    throw new Error('syncUserRole() trouble checking web3 balance: ', e)
  }

  if (userHasRole) {
    await db.user.update({
      where: { id: user.id },
      data: {
        roles: { connect: { id: role.id } },
      },
    })
  } else {
    await db.user.update({
      where: { id: user.id },
      data: {
        roles: { disconnect: { id: role.id } },
      },
    })
  }
  return userHasRole
}

export const fetchRole = async ({
  role: roleData,
  token: tokenData,
  guild: guildData,
}) => {
  // Create token
  let token = await db.token.findUnique({
    where: {
      contractAddress: tokenData.contractAddress,
      chainId: tokenData.chainId,
    },
  })
  if (!token) {
    token = await db.token.create({
      data: {
        contractAddress: tokenData.contractAddress,
        chainId: tokenData.chainId,
        type: tokenData.type,
      },
    })
  }
  // Create role
  const role = await db.role.upsert({
    where: {
      id: roleData.id,
    },
    update: {
      name: roleData.name,
      token: { connect: { id: token.id } },
      balance,
      purchaseUrl,
    },
    create: {
      name: roleData.name,
      token: { connect: { id: token.id } },
      guild: { connect: { id: guildData.id } },
      balance,
      purchaseUrl,
    },
  })
  return role
}
