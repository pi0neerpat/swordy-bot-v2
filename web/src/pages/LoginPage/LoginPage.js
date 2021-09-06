import { useParams } from '@redwoodjs/router'

import LoginCell from 'src/components/Login/LoginCell'

const LoginPage = () => {
  const { redirectTo, ephemeralId } = useParams()

  return <LoginCell ephemeralId={ephemeralId} />
}

export default LoginPage
