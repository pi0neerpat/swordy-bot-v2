export const schema = gql`
  type Guild {
    id: String!
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
    guildDiscordRoles(id: String!): [Role!]!
  }

  input CreateGuildInput {
    id: String!
    platform: String!
    name: String!
    iconUrl: String
    description: String
  }

  input CreateTokenInput {
    chainId: String!
    contractAddress: String!
    type: String!
    tokenId: Int
    uri: String
    website: String
    iconUrl: String
  }

  input CreateRoleInput {
    id: String!
    balance: String!
    description: String
    purchaseUrl: String
  }

  input AddGuildRoleInput {
    token: CreateTokenInput!
    role: CreateRoleInput!
  }

  type Mutation {
    createGuild(input: CreateGuildInput!): Guild!
    addGuildRole(id: String!, input: AddGuildRoleInput!): Guild!
    deleteGuild(id: String!): Guild!
  }
`
