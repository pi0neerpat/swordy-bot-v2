import { db } from 'src/lib/db'
import { requireAuth } from 'src/lib/auth'

// Used when the environment variable REDWOOD_SECURE_SERVICES=1
export const beforeResolver = (rules) => {
  rules.add(requireAuth)
}

export const roles = () => {
  return db.role.findMany()
}

export const role = ({ id }) => {
  return db.role.findUnique({
    where: { id },
  })
}

export const createRole = ({ input }) => {
  return db.role.create({
    data: input,
  })
}

export const updateRole = ({ id, input }) => {
  return db.role.update({
    data: input,
    where: { id },
  })
}

export const deleteRole = ({ id }) => {
  return db.role.delete({
    where: { id },
  })
}

export const Role = {
  guild: (_obj, { root }) =>
    db.role.findUnique({ where: { id: root.id } }).guild(),
  token: (_obj, { root }) =>
    db.role.findUnique({ where: { id: root.id } }).token(),
  users: (_obj, { root }) =>
    db.role.findUnique({ where: { id: root.id } }).users(),
}
