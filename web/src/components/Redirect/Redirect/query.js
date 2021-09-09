export const OAUTH_CODE_GRANT_QUERY = gql`
  query OauthCodeGrantQuery(
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
