import { guilds, guild, createGuild, updateGuild, deleteGuild } from './guilds'

describe('guilds', () => {
  scenario('returns all guilds', async (scenario) => {
    const result = await guilds()

    expect(result.length).toEqual(Object.keys(scenario.guild).length)
  })

  scenario('returns a single guild', async (scenario) => {
    const result = await guild({ id: scenario.guild.one.id })

    expect(result).toEqual(scenario.guild.one)
  })

  scenario('creates a guild', async () => {
    const result = await createGuild({
      input: { platformId: 'String', platform: 'String', name: 'String' },
    })

    expect(result.platformId).toEqual('String')
    expect(result.platform).toEqual('String')
    expect(result.name).toEqual('String')
  })

  scenario('updates a guild', async (scenario) => {
    const original = await guild({ id: scenario.guild.one.id })
    const result = await updateGuild({
      id: original.id,
      input: { platformId: 'String2' },
    })

    expect(result.platformId).toEqual('String2')
  })

  scenario('deletes a guild', async (scenario) => {
    const original = await deleteGuild({ id: scenario.guild.one.id })
    const result = await guild({ id: original.id })

    expect(result).toEqual(null)
  })
})
