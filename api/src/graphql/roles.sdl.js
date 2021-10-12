export const schema = gql`
  type Role {
    id: String!
    guild: Guild!
    guildId: String!
    name: String!
    type: String!
    description: String
    tokens: [Token]!
    userHasRole: Boolean
  }

  type Query {
    role(id: String!): Role @requireAuth
  }

  type Mutation {
    syncRole(id: String!): Role @requireAuth
    addRoleToken(
      guildId: String!
      roleId: String!
      chainId: String!
      contractAddress: String!
      type: String!
    ): Role! @verifyManager
    removeRoleToken(guildId: String!, roleId: String!, tokenId: String!): Role!
      @verifyManager
  }
`
