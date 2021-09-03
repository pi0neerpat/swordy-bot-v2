export const schema = gql`
  type Role {
    id: String!
    guild: Guild!
    name: String!
    platformId: String!
    description: String
    token: Token!
    balance: String!
    users: [User]!
    purchaseUrl: String
    guildPlatformId: String!
    tokenId: String!
  }

  type Query {
    roles: [Role!]!
    role(id: String!): Role
  }

  input CreateRoleInput {
    name: String!
    platformId: String!
    description: String
    balance: String!
    purchaseUrl: String
    guildPlatformId: String!
    tokenId: String!
  }

  input UpdateRoleInput {
    name: String
    platformId: String
    description: String
    balance: String
    purchaseUrl: String
    guildPlatformId: String
    tokenId: String
  }

  type Mutation {
    createRole(input: CreateRoleInput!): Role!
    updateRole(id: String!, input: UpdateRoleInput!): Role!
    deleteRole(id: String!): Role!
  }
`
