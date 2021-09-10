export const schema = gql`
  type Role {
    id: String!
    guild: Guild!
    guildId: String!
    name: String!
    type: String!
    users: [User]!
    description: String
    tokens: [Token]!
    userHasRole: Boolean
  }

  type Query {
    role(id: String!): Role
  }
  type Mutation {
    syncRole(id: String!): Role
  }
`
