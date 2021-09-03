import Token from 'src/components/Token/Token'

export const QUERY = gql`
  query FindTokenById($id: String!) {
    token: token(id: $id) {
      id
      chainId
      contractAddress
      type
      tokenId
      uri
      website
      iconUrl
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Token not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ token }) => {
  return <Token token={token} />
}
