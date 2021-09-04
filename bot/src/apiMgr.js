const { ApolloClient } = require('apollo-client')
const { InMemoryCache } = require('apollo-cache-inmemory')
const { HttpLink } = require('apollo-link-http')
const fetch = require('cross-fetch')
const { POST_MESSAGE_QUERY } = require('./queries')

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
          platformUserId: message.member.id,
          platform: 'discord',
          guildId: message.guild.id,
        },
      })
      return res.data
    } catch (e) {
      console.log(e)
      throw new Error(e)
    }
  }
}

module.exports = ApiMgr
