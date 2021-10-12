import { routes, navigate } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'
import { useParams } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { MobileWalletIcon, MetamaskIcon } from 'src/components/Icons'

const READY = 'ready'
const LOADING = 'loading'
const COMPLETE = 'complete'

const Login = () => {
  const [status, setStatus] = React.useState(READY)
  const { logIn } = useAuth()
  const { state, id } = useParams()

  const onLogIn = async (type) => {
    setStatus(LOADING)
    await logIn({ type, ...(state && { state, id }) })
    setStatus(COMPLETE)
    setTimeout(function () {
      navigate(routes.profile())
    }, 3000)
  }

  const renderCallToAction = () => {
    // TODO: Better handling for failed login attempts
    {
      /*
    // if (queryError)
        if (false)
      return (
        <p className="mt-8 text-xl">
          We had a problem! Please let us know in our Discord server if this
          keeps happening.
        </p>
      )
      */
    }
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
            <span role="img" aria-label="Confetti popper">
              🎉
            </span>
            Login complete! Taking you to your profile...
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

      <div className="mt-8 text-center ">
        <h1 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
          <span role="img" aria-label="Waving hand">
            👋
          </span>{' '}
          Are you worthy?{' '}
          <span role="img" aria-label="Crystal ball">
            🔮
          </span>
        </h1>
        <p className="mt-8">Sign-in with your wallet</p>
        {renderCallToAction()}
        <p className="mt-12 text-s text-grey-600">
          Having trouble? In your Discord server type &quot;<code>!unlock</code>
          &quot;
        </p>
      </div>
    </>
  )
}

export default Login
