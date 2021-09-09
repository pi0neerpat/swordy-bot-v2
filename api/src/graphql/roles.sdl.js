export const schema = gql`
  type Role {
    id: String!
    guild: Guild!
    guildId: String!
    name: String!
    chainId: String!
    contractAddress: String!
    type: String!
    users: [User]!
    description: String
    balance: String
    purchaseUrl: String
    tokenId: Int
    uri: String
    website: String
    iconUrl: String
    userHasRole: Boolean
  }

  type Query {
    role(id: String!): Role
  }
  type Mutation {
    syncRole(id: String!): Role
  }
`
