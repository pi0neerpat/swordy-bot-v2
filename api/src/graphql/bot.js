export const schema = gql`
  type Response {
    type: String!
    text: String
    url: String
  }
  type Redirect {
    url: String!
  }
  type Query {
    postMessage(
      content: String!
      platformUserId: String!
      platform: String!
      guildId: String!
      guild: JSON!
    ): Response!
    oauthCodeGrant(oauthState: String!, code: String!, type: String!): Redirect
  }
`
