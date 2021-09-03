export const schema = gql`
  type User {
    id: String!
    address: String!
    authDetail: AuthDetail!
    authDetailId: String!
    platformId: String
    platform: String
    guilds: [Guild]!
    roles: [Role]!
    ephemeralId: String
    currentSessionGuild: Guild
    currentSessionGuildPlatformId: String
  }

  type Query {
    users: [User!]!
    user(id: String!): User
  }

  input CreateUserInput {
    address: String!
    authDetailId: String!
    platformId: String
    platform: String
    ephemeralId: String
    currentSessionGuildPlatformId: String
  }

  input UpdateUserInput {
    address: String
    authDetailId: String
    platformId: String
    platform: String
    ephemeralId: String
    currentSessionGuildPlatformId: String
  }

  type Mutation {
    createUser(input: CreateUserInput!): User!
    updateUser(id: String!, input: UpdateUserInput!): User!
    deleteUser(id: String!): User!
  }
`
