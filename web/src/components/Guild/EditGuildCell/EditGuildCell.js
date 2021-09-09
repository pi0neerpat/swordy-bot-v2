import EditGuild from 'src/components/Guild/EditGuild'

export const QUERY = gql`
  query EditGuildById($id: String!) {
    guild: guild(id: $id) {
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

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ guild, refetch }) => (
  <EditGuild guild={guild} refetch={refetch} />
)
