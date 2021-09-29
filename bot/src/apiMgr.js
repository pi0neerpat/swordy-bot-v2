const { ApolloClient } = require('apollo-client')
const { InMemoryCache } = require('apollo-cache-inmemory')
const { HttpLink } = require('apollo-link-http')
const fetch = require('cross-fetch')
const gql = require('graphql-tag')

const POST_MESSAGE_QUERY = gql`
  query POST_MESSAGE_QUERY(
    $content: String!
    $userId: String!
    $platform: String!
    $guildId: String!
    $guild: JSON!
    $messageId: String!
  ) {
    postMessage(
      content: $content
      userId: $userId
      platform: $platform
      guildId: $guildId
      guild: $guild
      messageId: $messageId
    ) {
      type
      text
      url
    }
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
      const res = await this.client.query({
        query: POST_MESSAGE_QUERY,
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
}

module.exports = ApiMgr
