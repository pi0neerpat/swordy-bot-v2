import { db } from 'src/lib/db'
import { requireAuth, getCurrentUser } from 'src/lib/auth'

// Used when the environment variable REDWOOD_SECURE_SERVICES=1
export const beforeResolver = (rules) => {
  rules.skip({ only: ['loginSuccess', 'loginEphemeralIdValid'] })
}

export const users = () => {
  return db.user.findMany()
}

export const user = ({ address }) => {
  return db.user.findUnique({
    where: { address },
  })
}

export const loginSuccess = async () => {
  // TODO: Get user ephemeralId from JWT auth
  const user = getCurrentUser()
  console.log(user)
  // console.log(getCurrentUser());
  // // Remove the ephemeralId from the user
  // const user = await db.user.update({
  //   where: { id },
  //   data: {
  //     ephemeralId: null,
  //   },
  // })

  return { id: 'abc123' }
}
export const loginEphemeralIdValid = ({ ephemeralId }) => {
  return db.user.findFirst({
    where: { ephemeralId },
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
