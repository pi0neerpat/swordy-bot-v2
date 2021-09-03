import { tokens, token, createToken, updateToken, deleteToken } from './tokens'

describe('tokens', () => {
  scenario('returns all tokens', async (scenario) => {
    const result = await tokens()

    expect(result.length).toEqual(Object.keys(scenario.token).length)
  })

  scenario('returns a single token', async (scenario) => {
    const result = await token({ id: scenario.token.one.id })

    expect(result).toEqual(scenario.token.one)
  })

  scenario('creates a token', async () => {
    const result = await createToken({
      input: { chainId: 'String', contractAddress: 'String', type: 'String' },
    })

    expect(result.chainId).toEqual('String')
    expect(result.contractAddress).toEqual('String')
    expect(result.type).toEqual('String')
  })

  scenario('updates a token', async (scenario) => {
    const original = await token({ id: scenario.token.one.id })
    const result = await updateToken({
      id: original.id,
      input: { chainId: 'String2' },
    })

    expect(result.chainId).toEqual('String2')
  })

  scenario('deletes a token', async (scenario) => {
    const original = await deleteToken({ id: scenario.token.one.id })
    const result = await token({ id: original.id })

    expect(result).toEqual(null)
  })
})
