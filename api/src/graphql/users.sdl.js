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
    currentSessionGuildId: String
  }

  type Query {
    users: [User!]!
    user(id: String!): User
  }
`
