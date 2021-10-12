import { db } from 'src/lib/db'

export const ownProfile = () => {
  return db.user.findUnique({
    where: { id: context.currentUser.id },
  })
}

export const User = {
  guilds: (_obj, { root }) =>
    db.user.findUnique({ where: { id: root.id } }).guilds(),
  currentSessionGuild: (_obj, { root }) =>
    db.user.findUnique({ where: { id: root.id } }).currentSessionGuild(),
}
