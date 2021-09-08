import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes, navigate } from '@redwoodjs/router'
import ServerRoleForm from 'src/components/Role/ServerRoleForm'

const ADD_GUILD_ROLE_MUTATION = gql`
  mutation addGuildRoleMutation($id: String!, $input: AddGuildRoleInput!) {
    addGuildRole(id: $id, input: $input) {
      id
    }
  }
`

const ServerRoles = ({ roles, guildId }) => {
  const [addGuildRole, { loading, error }] = useMutation(
    ADD_GUILD_ROLE_MUTATION,
    {
      onCompleted: () => {
        toast.success('Role is now token-gated')
        navigate(routes.guild({ id: guildId }))
      },
    }
  )

  const onSave = (input, id) => {
    addGuildRole({
      variables: {
        id: guildId,
        input: { id, ...input },
      },
    })
  }

  const onSubmit = () => {}
  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <tbody>
          {roles.map((role) => (
            <tr key={role.id}>
              <td>{role.name}</td>
              <td>
                <ServerRoleForm
                  role={role}
                  onSave={onSave}
                  error={error}
                  loading={loading}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ServerRoles
