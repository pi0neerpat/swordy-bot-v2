import { Link, routes, navigate } from '@redwoodjs/router'

export const QUERY = gql`
  query AuthorizationCodeGrant(
    $type: String!
    $oauthState: String!
    $code: String!
  ) {
    oauthCodeGrant: oauthCodeGrant(
      oauthState: $oauthState
      code: $code
      type: $type
    ) {
      url
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ oauthCodeGrant }) => {
  navigate(oauthCodeGrant.url)
  return <div>Redirecting...</div>
}
