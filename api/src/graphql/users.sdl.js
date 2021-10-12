export const schema = gql`
  type User {
    id: String!
    address: String
    iconUrl: String
    username: String
    platformId: String
    platform: String
    guilds: [Guild]!
    roles: [Role]!
    currentSessionGuild: Guild
    currentSessionGuildId: String
  }

  type Query {
    ownProfile: User @verifyOwnership
  }
`
