import { Link, routes } from '@redwoodjs/router'

import Roles from 'src/components/Role/Roles'

export const QUERY = gql`
  query FindRoles {
    roles {
      id
      name
      platformId
      description
      balance
      purchaseUrl
      guildPlatformId
      tokenId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No roles yet. '}
      <Link to={routes.newRole()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ roles }) => {
  return <Roles roles={roles} />
}
