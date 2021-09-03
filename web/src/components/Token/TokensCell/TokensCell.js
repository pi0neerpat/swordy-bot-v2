import { Link, routes } from '@redwoodjs/router'

import Tokens from 'src/components/Token/Tokens'

export const QUERY = gql`
  query FindTokens {
    tokens {
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

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No tokens yet. '}
      <Link to={routes.newToken()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ tokens }) => {
  return <Tokens tokens={tokens} />
}
