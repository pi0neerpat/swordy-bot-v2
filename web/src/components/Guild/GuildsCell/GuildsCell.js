import { Link, routes } from '@redwoodjs/router'

import Guilds from 'src/components/Guild/Guilds'

export const QUERY = gql`
  query FindGuilds {
    guilds {
      platformId
      platform
      name
      iconUrl
      description
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No guilds yet. '}
      <Link to={routes.newGuild()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ guilds }) => {
  return <Guilds guilds={guilds} />
}
