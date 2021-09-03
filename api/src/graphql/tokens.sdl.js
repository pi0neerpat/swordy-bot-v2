export const schema = gql`
  type Token {
    id: String!
    chainId: String!
    contractAddress: String!
    type: String!
    tokenId: Int
    uri: String
    website: String
    iconUrl: String
    Role: [Role]!
  }

  type Query {
    tokens: [Token!]!
    token(id: String!): Token
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

  input UpdateTokenInput {
    chainId: String
    contractAddress: String
    type: String
    tokenId: Int
    uri: String
    website: String
    iconUrl: String
  }

  type Mutation {
    createToken(input: CreateTokenInput!): Token!
    updateToken(id: String!, input: UpdateTokenInput!): Token!
    deleteToken(id: String!): Token!
  }
`
