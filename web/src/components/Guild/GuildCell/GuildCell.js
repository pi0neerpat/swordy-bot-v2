import Guild from 'src/components/Guild/Guild'
import Loader from 'src/components/Loader'

export const QUERY = gql`
  query FindGuildById($guildId: String!) {
    guild: guild(guildId: $guildId) {
      id
      platform
      name
      iconUrl
      description
      roles {
        id
        userHasRole
      }
      isUserManager
    }
  }
`

export const Loading = () => (
  <div className="p-4 mt-4 rw-segment h-64 flex items-center justify-center">
    <Loader />
  </div>
)

export const Empty = () => <div>Guild not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ guild }) => {
  return <Guild guild={guild} />
}
