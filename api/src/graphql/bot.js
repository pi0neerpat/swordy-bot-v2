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
      userId: String!
      platform: String!
      guildId: String!
      guild: JSON!
    ): Response!
  }
  type Mutation {
    oauthCodeGrant(oauthState: String!, code: String!, type: String!): Redirect!
  }
`
