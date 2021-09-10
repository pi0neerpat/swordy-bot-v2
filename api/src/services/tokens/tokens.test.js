import { tokens } from './tokens'

describe('tokens', () => {
  scenario('returns all tokens', async (scenario) => {
    const result = await tokens()

    expect(result.length).toEqual(Object.keys(scenario.token).length)
  })
})
