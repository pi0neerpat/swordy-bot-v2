import { useMutation } from '@redwoodjs/web'
import { useParams } from '@redwoodjs/router'

import DefaultLayout from 'src/layouts/DefaultLayout'
import Loader from 'src/components/Loader'
import { CheckmarkIcon } from 'src/components/Icons'
import RedirectOptions from 'src/components/RedirectOptions'

export const OAUTH_CODE_GRANT_MUTATION = gql`
  mutation OauthCodeGrantMutation(
    $type: String!
    $oauthState: String
    $code: String
    $signature: String
    $userId: String
  ) {
    redirectOptions: oauthCodeGrant(
      oauthState: $oauthState
      code: $code
      type: $type
      signature: $signature
      userId: $userId
    ) {
      url
      text
      roleName
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
  }, [code, codeGrantMutation, oauthState, signature, type, userId])

  const doRedirect = () => {
    if (data?.redirectOptions) {
      if (data.redirectOptions[0].url.includes('discord.com/invite')) {
        // Return the user back to Discord
        setUnlockSuccess(true)
        return setTimeout(() => {
          window.location.href = data.redirectOptions[0].url
        }, [3000])
      }

      // Automatic redirect only if there is only one role option
      if (data.redirectOptions.length === 1)
        window.location.href = data.redirectOptions[0].url
    }
  }

  React.useEffect(() => {
    doRedirect()
    /*eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [data])

  if (mutationError || error)
    return (
      <DefaultLayout>
        <div className="mt-8 sm:text-center lg:text-left">
          <h1 className="text-l tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span role="img" aria-label="cloud_with_lightning_and_rain">
              ⛈️
            </span>{' '}
            Oops! Something went wrong
          </h1>
          <p className="mt-8 text-s text-grey-600">
            <b className="mt-8 text-s text-blue-600">
              Please restart by typing &quot;!unlock&quot; in Discord
            </b>
            <br />
            <br />
            <ul>
              <li>
                <span role="img" aria-label="alien invader">
                  👾
                </span>
                Using multiple Discord accounts? Be sure you&apos;re signed into
                the right one in this browser -{' '}
                <a href="https://discord.com/login" className="text-blue-600">
                  Discord Login
                </a>
              </li>
            </ul>
          </p>
          <div className=" mt-8 rw-cell-error w-half">
            {mutationError?.message || error}
          </div>
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
  if (data?.redirectOptions.length > 1)
    return (
      <div className="min-w-full min-h-screen flex items-center justify-center">
        <RedirectOptions options={data.redirectOptions} />
      </div>
    )
  return (
    <div className="min-w-full min-h-screen flex items-center justify-center">
      <Loader />
    </div>
  )
}

export default Redirect
