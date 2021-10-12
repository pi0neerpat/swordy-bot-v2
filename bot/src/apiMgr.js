const { ApolloClient } = require('apollo-client')
const { InMemoryCache } = require('apollo-cache-inmemory')
const { HttpLink } = require('apollo-link-http')
const fetch = require('cross-fetch')
const gql = require('graphql-tag')

const POST_MESSAGE_MUTATION = gql`
  mutation POST_MESSAGE_MUTATION(
    $content: String!
    $userId: String!
    $platform: String!
    $guildId: String!
    $guild: JSON!
  ) {
    postMessage(
      content: $content
      userId: $userId
      platform: $platform
      guildId: $guildId
      guild: $guild
    ) {
      type
      text
      url
    }
  }
`

const UPDATE_PROMPT_MESSAGE_ID_MUTATION = gql`
  mutation UPDATE_PROMPT_MESSAGE_ID_MUTATION(
    $userId: String!
    $promptMessageId: String!
  ) {
    updatePromptMessageId(userId: $userId, promptMessageId: $promptMessageId)
  }
`

class ApiMgr {
  constructor() {
    const debug = true
    const cache = new InMemoryCache()
    const link = new HttpLink({
      uri: process.env.API_URL,
      fetch,
    })
    this.client = new ApolloClient({
      link,
      cache,
      onError: (e) => {
        debug && console.log(e)
      },
      defaultOptions: {
        query: {
          fetchPolicy: 'network-only',
        },
      },
    })
  }

  async postMessage({ message }) {
    try {
      const res = await this.client.mutate({
        mutation: POST_MESSAGE_MUTATION,
        variables: {
          content: message.content,
          userId: message.member.id,
          platform: 'discord',
          guildId: message.guild.id,
          guild: message.guild,
        },
      })
      return res.data.postMessage
    } catch (e) {
      console.log(e)
      throw new Error(e)
    }
  }

  async updatePromptMessageId({ message, userId }) {
    try {
      const res = await this.client.mutate({
        mutation: UPDATE_PROMPT_MESSAGE_ID_MUTATION,
        variables: {
          userId,
          promptMessageId: `${message.channel.id}-${message.id}`,
        },
      })
      return res.data.postMessage
    } catch (e) {
      console.log(e)
      throw new Error(e)
    }
  }
}

module.exports = ApiMgr
