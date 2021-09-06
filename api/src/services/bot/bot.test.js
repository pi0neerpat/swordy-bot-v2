import { postMessage } from './bot'

describe('bot', () => {
  scenario('post invocation message', async () => {
    const result = await postMessage({
      input: {
        content: '!kneel',
        platformUserId: '381135787330109441',
        platform: 'discord',
        guildId: '817286182890242059',
      },
    })

    expect(result.text).toEqual('String')
  })
})
