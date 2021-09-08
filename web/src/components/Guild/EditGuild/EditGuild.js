import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import RoleCell from 'src/components/Role/RoleCell'
import ServerRolesCell from 'src/components/Role/ServerRolesCell'

const UPDATE_GUILD_MUTATION = gql`
  mutation AddGuildRoleMutation($id: String!, $input: AddGuildRoleInput!) {
    addGuildRole(id: $id, input: $input) {
      id
      platform
      name
      iconUrl
      description
    }
  }
`

const EditGuild = ({ guild }) => {
  const [addGuildRole, { loading, error }] = useMutation(
    UPDATE_GUILD_MUTATION,
    {
      onCompleted: () => {
        toast.success('Guild role updated!')
      },
    }
  )

  const onSave = (input, id) => {
    addGuildRole({ variables: { id, input } })
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Roles for {guild.name}
          </h2>
        </header>
        <div className="rw-segment-main">
          <table className="rw-table">
            <tbody>
              {guild?.roles.length
                ? guild.roles.map((role, i) => (
                    <RoleCell key={i} id={role.id} />
                  ))
                : 'No roles have been set up for this guild'}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-6 rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Roles without token-gating
          </h2>
        </header>
        <div className="rw-segment-main">
          <table className="rw-table">
            <tbody>
              <ServerRolesCell id={guild.id} />
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
export default EditGuild
