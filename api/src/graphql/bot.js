export const schema = gql`
  type Response {
    type: String!
    text: String
    url: String
  }
  type Query {
    postMessage(
      content: String!
      platformUserId: String!
      platform: String!
      guildId: String!
    ): Response!
  }
`
