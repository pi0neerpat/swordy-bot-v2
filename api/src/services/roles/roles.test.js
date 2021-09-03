import { roles, role, createRole, updateRole, deleteRole } from './roles'

describe('roles', () => {
  scenario('returns all roles', async (scenario) => {
    const result = await roles()

    expect(result.length).toEqual(Object.keys(scenario.role).length)
  })

  scenario('returns a single role', async (scenario) => {
    const result = await role({ id: scenario.role.one.id })

    expect(result).toEqual(scenario.role.one)
  })

  scenario('creates a role', async (scenario) => {
    const result = await createRole({
      input: {
        name: 'String',
        platformId: 'String',
        balance: 'String',
        guildPlatformId: scenario.role.two.guildPlatformId,
        tokenId: scenario.role.two.tokenId,
      },
    })

    expect(result.name).toEqual('String')
    expect(result.platformId).toEqual('String')
    expect(result.balance).toEqual('String')
    expect(result.guildPlatformId).toEqual(scenario.role.two.guildPlatformId)
    expect(result.tokenId).toEqual(scenario.role.two.tokenId)
  })

  scenario('updates a role', async (scenario) => {
    const original = await role({ id: scenario.role.one.id })
    const result = await updateRole({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a role', async (scenario) => {
    const original = await deleteRole({ id: scenario.role.one.id })
    const result = await role({ id: original.id })

    expect(result).toEqual(null)
  })
})
