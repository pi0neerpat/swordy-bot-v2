import { useMutation } from '@redwoodjs/web'
import { routes, navigate } from '@redwoodjs/router'

import DefaultLayout from 'src/layouts/DefaultLayout'
import Loader from 'src/components/Loader'

export const OAUTH_CODE_GRANT_MUTATION = gql`
  mutation OauthCodeGrantMutation(
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

const Redirect = ({ type, code, oauthState }) => {
  const [codeGrantMutation, { error, data }] = useMutation(
    OAUTH_CODE_GRANT_MUTATION
  )

  React.useEffect(() => {
    codeGrantMutation({
      variables: {
        type,
        code,
        oauthState,
      },
    })
  }, [])
  if (data?.redirect) navigate(data.redirect.url)

  if (error)
    return (
      <DefaultLayout>
        <div className="mt-8 sm:text-center lg:text-left">
          <h1 className="text-l tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            ⛈️ Oops! Something went wrong
          </h1>
          <div className=" mt-8 rw-cell-error">{error.message}</div>
          <p className="mt-8 text-s text-grey-600">
            <b>Please start over in Discord</b>
          </p>
        </div>
      </DefaultLayout>
    )
  return (
    <div className="min-w-full min-h-screen flex items-center justify-center">
      <Loader />
    </div>
  )
}

export default Redirect
