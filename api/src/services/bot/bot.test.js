import { postMessage } from './bot'

describe('bot', () => {
  scenario('post invocation message', async (scenario) => {
    const result = await postMessage({
      content: '!kneel',
      platformUserId: '381135787330109441',
      platform: 'discord',
      guildId: '817286182890242059',
    })
    expect(result.text).toEqual('String')
  })
})
