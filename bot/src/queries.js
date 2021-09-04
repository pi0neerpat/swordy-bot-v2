const gql = require('graphql-tag')

const POST_MESSAGE_QUERY = gql`
  query POST_MESSAGE_QUERY(
    $content: String!
    $platformUserId: String!
    $platform: String!
    $guildId: String!
  ) {
    postMessage(
      content: $content
      platformUserId: $platformUserId
      platform: $platform
      guildId: $guildId
    ) {
      type
      text
      url
    }
  }
`
module.exports = { POST_MESSAGE_QUERY }
