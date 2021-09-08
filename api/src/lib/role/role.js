import { db } from 'src/lib/db'

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
