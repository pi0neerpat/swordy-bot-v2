import { useMutation } from '@redwoodjs/web'
import { routes, navigate, useParams } from '@redwoodjs/router'

import DefaultLayout from 'src/layouts/DefaultLayout'
import Loader from 'src/components/Loader'
import { CheckmarkIcon } from 'src/components/Icons'

export const OAUTH_CODE_GRANT_MUTATION = gql`
  mutation OauthCodeGrantMutation(
    $type: String!
    $oauthState: String
    $code: String
    $signature: String
    $userId: String
  ) {
    redirect: oauthCodeGrant(
      oauthState: $oauthState
      code: $code
      type: $type
      signature: $signature
      userId: $userId
    ) {
      url
    }
  }
`

const Redirect = ({ type }) => {
  const [error, setError] = React.useState()
  const [unlockSuccess, setUnlockSuccess] = React.useState(false)
  const { code, state: oauthState, signature, id: userId } = useParams()
  const [codeGrantMutation, { error: mutationError, data }] = useMutation(
    OAUTH_CODE_GRANT_MUTATION
  )

  React.useEffect(() => {
    if (type === 'unlock' && !signature)
      return setError('Lock Purchase was not successful')
    codeGrantMutation({
      variables: {
        type,
        code,
        oauthState,
        signature: decodeURI(signature),
        userId,
      },
    })
  }, [])

  const doRedirect = () => {
    if (data?.redirect) {
      if (data.redirect.url.includes('discord.com/invite')) {
        setUnlockSuccess(true)
        return setTimeout(() => {
          window.location.href = data.redirect.url
        }, [3000])
      }
      window.location.href = data.redirect.url
    }
  }

  React.useEffect(() => {
    doRedirect()
  }, [data])

  if (mutationError || error)
    return (
      <DefaultLayout>
        <div className="mt-8 sm:text-center lg:text-left">
          <h1 className="text-l tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            ⛈️ Oops! Something went wrong
          </h1>
          <div className=" mt-8 rw-cell-error">
            {mutationError?.message || error}
          </div>
          <p className="mt-8 text-s text-grey-600">
            <b>Please start over in Discord</b>
          </p>
        </div>
      </DefaultLayout>
    )
  if (unlockSuccess)
    return (
      <div className="flex-grow min-w-screen min-h-screen ">
        <div className="mt-16 flex items-center justify-center">
          <CheckmarkIcon width="2rem" height="2rem" color="green" />
          <p>Success! Taking you back to Discord...</p>
        </div>
      </div>
    )
  return (
    <div className="min-w-full min-h-screen flex items-center justify-center">
      <Loader />
    </div>
  )
}

export default Redirect
