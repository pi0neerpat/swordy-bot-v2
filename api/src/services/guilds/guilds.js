import { db } from 'src/lib/db'
import { requireAuth } from 'src/lib/auth'

// Used when the environment variable REDWOOD_SECURE_SERVICES=1
export const beforeResolver = (rules) => {
  rules.add(requireAuth)
}

export const guilds = () => {
  return db.guild.findMany()
}

export const guild = ({ id }) => {
  return db.guild.findUnique({
    where: { id },
  })
}

export const createGuild = ({ input }) => {
  return db.guild.create({
    data: input,
  })
}

export const updateGuild = ({ id, input }) => {
  return db.guild.update({
    data: input,
    where: { id },
  })
}

export const deleteGuild = ({ id }) => {
  return db.guild.delete({
    where: { id },
  })
}

export const Guild = {
  roles: (_obj, { root }) =>
    db.guild.findUnique({ where: { id: root.id } }).roles(),
  users: (_obj, { root }) =>
    db.guild.findUnique({ where: { id: root.id } }).users(),
  User: (_obj, { root }) =>
    db.guild.findUnique({ where: { id: root.id } }).User(),
}
