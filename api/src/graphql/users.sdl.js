export const schema = gql`
  type User {
    id: String!
    address: String
    authDetail: AuthDetail
    authDetailId: String
    platformId: String
    platform: String
    guilds: [Guild]!
    roles: [Role]!
    oauthState: String
    currentSessionGuild: Guild
    currentSessionGuildPlatformId: String
  }

  type Query {
    users: [User!]!
    user(id: String!): User
  }

  input CreateUserInput {
    address: String
    authDetailId: String
    platformId: String
    platform: String
    oauthState: String
    currentSessionGuildPlatformId: String
  }

  input UpdateUserInput {
    address: String
    authDetailId: String
    platformId: String
    platform: String
    oauthState: String
    currentSessionGuildPlatformId: String
  }

  type Mutation {
    createUser(input: CreateUserInput!): User!
    updateUser(id: String!, input: UpdateUserInput!): User!
    deleteUser(id: String!): User!
  }
`
