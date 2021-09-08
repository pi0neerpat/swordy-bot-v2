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
    guildId: String!
    tokenId: String!
  }

  type Query {
    roles: [Role!]!
    role(id: String!): Role
  }

  input CreateRoleInput {
    id: String!
    balance: String!
    description: String
    purchaseUrl: String
  }

  type Mutation {
    createRole(input: CreateRoleInput!): Role!
    deleteRole(id: String!): Role!
  }
`
