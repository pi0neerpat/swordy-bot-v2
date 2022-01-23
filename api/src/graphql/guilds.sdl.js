export const schema = gql`
  type Guild {
    id: String!
    platform: String!
    name: String!
    iconUrl: String
    description: String
    roles: [Role]!
    isUserManager: Boolean
  }
  type GuildStats {
    name: String!
    iconUrl: String
    description: String
    roleCount: Int
    userCount: Int
  }

  type Query {
    guildStats: [GuildStats!]! @skipAuth
    guildCount: Int! @skipAuth
    guild(guildId: String!): Guild @requireAuth
    guildDiscordRoles(guildId: String!): [Role!]! @verifyManager
  }
`
