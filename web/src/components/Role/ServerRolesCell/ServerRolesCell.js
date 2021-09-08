import ServerRoles from 'src/components/Role/ServerRoles'

export const QUERY = gql`
  query DiscordRoles($id: String!) {
    guildDiscordRoles(id: $id) {
      id
      name
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Role not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ guildDiscordRoles, id }) => {
  return <ServerRoles roles={guildDiscordRoles} guildId={id} />
}
