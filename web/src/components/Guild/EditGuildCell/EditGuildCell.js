import EditGuild from 'src/components/Guild/EditGuild'
import Loader from 'src/components/Loader'

export const QUERY = gql`
  query EditGuildById($guildId: String!) {
    guild: guild(guildId: $guildId) {
      id
      platform
      name
      iconUrl
      description
      roles {
        id
      }
    }
  }
`

export const Loading = () => (
  <div className="p-4 mt-4 h-64 flex items-center justify-center">
    <Loader />
  </div>
)

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ guild, refetch }) => (
  <EditGuild guild={guild} refetch={refetch} />
)
