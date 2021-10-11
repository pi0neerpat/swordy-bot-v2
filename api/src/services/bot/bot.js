import {
  handleMessage,
  handleOauthCodeGrant,
  handleUpdatePromptMessageId,
} from 'src/lib/bot/bot'

// Used when the environment variable REDWOOD_SECURE_SERVICES=1
export const beforeResolver = (rules) => {
  rules.skip({
    only: ['postMessage', 'oauthCodeGrant', 'updatePromptMessageId'],
  })
}

export const postMessage = (input) => handleMessage(input)

export const oauthCodeGrant = (input) => handleOauthCodeGrant(input)

export const updatePromptMessageId = (input) =>
  handleUpdatePromptMessageId(input)
