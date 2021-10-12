export const schema = gql`
  type Response {
    type: String!
    text: String
    url: String
  }
  type RedirectOption {
    url: String!
    text: String
    roleName: String
  }
  type Query {
    postMessage(
      content: String!
      userId: String!
      platform: String!
      guildId: String!
      guild: JSON!
    ): Response! @skipAuth
  }
  type Mutation {
    updatePromptMessageId(userId: String!, promptMessageId: String!): String!
      @skipAuth
    oauthCodeGrant(
      oauthState: String
      code: String
      type: String!
      signature: String
      userId: String
    ): [RedirectOption!]! @skipAuth
  }
`
