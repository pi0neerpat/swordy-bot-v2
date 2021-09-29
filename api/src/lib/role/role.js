import { db } from 'src/lib/db'
import { TOKEN_TYPES } from 'src/lib/role/constants'
import { checkTokenBalance } from 'src/lib/web3/token'
import { checkUnlockBalance } from 'src/lib/web3/unlock'
import { addRoleForUser, removeRoleForUser } from 'src/lib/discord'

export const syncUserRole = async ({ user, role }) => {
  const { tokens } = role
  const { address: userAddress } = user
  let userHasRole = false
  await Promise.all(
    tokens.map(async (token, index) => {
      let hasRole = false
      const { chainId, contractAddress, type } = token
      try {
        if (type == TOKEN_TYPES.ERC721 || type == TOKEN_TYPES.ERC20) {
          hasRole = await checkTokenBalance({
            userAddress,
            chainId,
            contractAddress,
            type,
          })
        } else if (type == TOKEN_TYPES.UNLOCK) {
          try {
            hasRole = await checkUnlockBalance({
              userAddress,
              chainId,
              contractAddress,
            })
          } catch (e) {
            console.log(e)
          }
        }
        if (hasRole) userHasRole = true
      } catch (e) {
        throw new Error(
          `We had trouble with token ${contractAddress.substring(
            0,
            15
          )}... ${e}`
        )
      }
    })
  )
  if (userHasRole) {
    await addRoleForUser(role.guildId, role.id, user.id)
    // TODO: Ensure role was successfully added in Discord
    await db.user.update({
      where: { id: user.id },
      data: {
        roles: { connect: { id: role.id } },
      },
    })
  } else {
    await removeRoleForUser(role.guildId, role.id, user.id)
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
  // // Create role
  // const role = await db.role.upsert({
  //   where: {
  //     id: roleData.id,
  //   },
  //   update: {
  //     name: roleData.name,
  //     token: { connect: { id: token.id } },
  //     balance,
  //     purchaseUrl,
  //   },
  //   create: {
  //     name: roleData.name,
  //     token: { connect: { id: token.id } },
  //     guild: { connect: { id: guildData.id } },
  //     balance,
  //     purchaseUrl,
  //   },
  // })
  return role
}
