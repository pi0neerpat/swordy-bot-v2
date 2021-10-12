export const schema = gql`
  type Token {
    id: String!
    chainId: String!
    contractAddress: String!
    type: String!
    purchaseUrl: String
    balance: String
    iconUrl: String
    Role: Role
    roleId: String
  }
`
