import { EnvelopError } from '@envelop/core'

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
    tokens.map(async (token) => {
      let hasRole = false
      const { chainId, contractAddress, type, tokenId } = token
      try {
        if (type == TOKEN_TYPES.UNLOCK) {
          try {
            hasRole = await checkUnlockBalance({
              userAddress,
              chainId,
              contractAddress,
            })
            if (hasRole) userHasRole = true
          } catch (e) {
            console.log(e)
          }
        } else {
          hasRole = await checkTokenBalance({
            userAddress,
            chainId,
            contractAddress,
            type,
            tokenId,
          })
          if (hasRole) userHasRole = true
        }
      } catch (e) {
        throw new EnvelopError(
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
