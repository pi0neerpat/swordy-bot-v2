import { handleMessage } from 'src/lib/bot/bot'

// Used when the environment variable REDWOOD_SECURE_SERVICES=1
export const beforeResolver = (rules) => {
  // TODO: SECURITY CONCER - Add verification so only the bot can send messages here
  rules.skip({ only: ['postMessage'] })
}

export const postMessage = (input) => handleMessage(input)
