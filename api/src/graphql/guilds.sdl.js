export const schema = gql`
  type Guild {
    id: String!
    platform: String!
    name: String!
    iconUrl: String
    description: String
    roles: [Role]!
    userCount: Int!
    isUserManager: Boolean
  }

  type Query {
    guilds: [Guild!]!
    guildCount: Int!
    guild(id: String!): Guild
    guildDiscordRoles(id: String!): [Role!]!
  }

  input CreateGuildInput {
    id: String!
    platform: String!
    name: String!
    iconUrl: String
    description: String
  }

  type Mutation {
    createGuild(input: CreateGuildInput!): Guild!
  }
`
