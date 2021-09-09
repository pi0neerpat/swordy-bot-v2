import { Link, routes, navigate } from '@redwoodjs/router'
import Redirect from 'src/components/Redirect/Redirect'
export const QUERY = gql`
  query AuthorizationCodeGrant(
    $type: String!
    $oauthState: String!
    $code: String!
  ) {
    redirect: oauthCodeGrant(
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

export const Failure = ({ error }) => <Redirect message={error.message} />

export const Success = ({ redirect }) => {
  navigate(redirect.url)
  return <div>Redirecting...</div>
}
