import User from 'src/components/User/User'

export const QUERY = gql`
  query GetOwnProfile {
    user: ownProfile {
      id
      platform
      address
      username
      iconUrl
      roles {
        id
      }
      guilds {
        id
      }
      currentSessionGuild {
        id
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>User not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ user }) => {
  return <User user={user} />
}
