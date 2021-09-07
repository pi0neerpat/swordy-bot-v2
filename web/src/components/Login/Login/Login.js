import { Link, routes, navigate } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'
import { useParams } from '@redwoodjs/router'
import { MetaTags, useQuery } from '@redwoodjs/web'
import { MobileWalletIcon, MetamaskIcon } from 'src/components/Icons'

const READY = 'ready'
const LOADING = 'loading'
const COMPLETE = 'complete'
const ERROR = 'error'

const Login = () => {
  const [status, setStatus] = React.useState(READY)
  const { logIn, logOut, isAuthenticated, loading, currentUser } = useAuth()
  const { state, id } = useParams()

  // const LOGIN_SUCCESS_QUERY = gql`
  //   query loginSuccess {
  //     loginSuccess {
  //       id
  //     }
  //   }
  // `
  // const [loginSuccess, { _, error: queryError }] = useQuery(
  //   LOGIN_SUCCESS_QUERY,
  //   {
  //     onCompleted: () => {
  //       setStatus(COMPLETE)
  //       setTimeout(function () {
  //         navigate(routes.user({ address: currentUser?.address }))
  //       }, 5000)
  //     },
  //   }
  // )

  const onLogIn = async (type) => {
    setStatus(LOADING)
    try {
      await logIn({ type, ...(state && { state, id }) })
      // if (id) {
      //   // TODO: if it makes sense, move this to backend
      //   await loginSuccess()
      // }
      // send mutation with id
    } catch (e) {
      console.log(e)
      setStatus(ERROR)
    }
  }
  const onLogOut = async () => {
    await logOut()
  }

  const renderCallToAction = () => {
    // if (queryError)
    if (false)
      return (
        <p className="mt-8 text-xl">
          We had a problem! Please let us know in our Discord server if this
          keeps happening.
        </p>
      )
    // Happy case
    return (
      <>
        {status !== COMPLETE ? (
          <ul>
            <li>
              <button
                disabled={status === LOADING}
                className={
                  'mt-4 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border rounded-md shadow-sm text-base font-medium hover:bg-gray-300'
                }
                onClick={() => onLogIn()}
              >
                <div className="mr-4">
                  <MetamaskIcon />
                </div>
                {status === LOADING ? 'Waiting...' : 'Log in with Ethereum'}
              </button>
            </li>
            <li>
              <button
                disabled={status === LOADING}
                className={
                  'mt-4 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border rounded-md shadow-sm text-base font-medium hover:bg-gray-300'
                }
                onClick={() => onLogIn('walletConnect')}
              >
                <div className="mr-4">
                  <MobileWalletIcon />
                </div>
                {status === LOADING ? 'Waiting...' : 'Wallet Connect'}
              </button>
            </li>
          </ul>
        ) : (
          <p className="mt-8 text-xl">
            🎉 Login complete! Redirecting you to your profile now...
          </p>
        )}
      </>
    )
  }

  return (
    <>
      <MetaTags
        title="Login"
        // description="Home description"
        /* you should un-comment description and add a unique description, 155 characters or less
    You can look at this documentation for best practices : https://developers.google.com/search/docs/advanced/appearance/good-titles-snippets */
      />

      <div className="mt-8 sm:text-center lg:text-left">
        <h1 className="text-l tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
          👋 Are you worthy? 🔮
        </h1>
        <p className="mt-4">Sign-in with your wallet</p>
        {renderCallToAction()}
        <p className="mt-12 text-s text-grey-600">
          Having trouble? Try clicking <button onClick={onLogOut}>here</button>{' '}
          and starting over.
        </p>
      </div>
    </>
  )
}

export default Login