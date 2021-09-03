export const schema = gql`
  type Guild {
    platformId: String!
    platform: String!
    name: String!
    iconUrl: String
    description: String
    roles: [Role]!
    users: [User]!
    User: [User]!
  }

  type Query {
    guilds: [Guild!]!
    guild(id: String!): Guild
  }

  input CreateGuildInput {
    platformId: String!
    platform: String!
    name: String!
    iconUrl: String
    description: String
  }

  input UpdateGuildInput {
    platformId: String
    platform: String
    name: String
    iconUrl: String
    description: String
  }

  type Mutation {
    createGuild(input: CreateGuildInput!): Guild!
    updateGuild(id: String!, input: UpdateGuildInput!): Guild!
    deleteGuild(id: String!): Guild!
  }
`
