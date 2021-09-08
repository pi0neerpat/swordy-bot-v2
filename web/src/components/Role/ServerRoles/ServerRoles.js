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
  const [selectedRole, setSelectedRole] = React.useState('')
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
    <div>
      {roles.map((role) => (
        <>
          <div className="flex mt-4 justify-between items-center">
            <div className="items-center">
              <h2 className="text-2xl">{role.name}</h2>
            </div>
            <button
              type="button"
              className="rw-button rw-button-green"
              onClick={() =>
                setSelectedRole(selectedRole === role.id ? null : role.id)
              }
            >
              Add Token Access
            </button>
          </div>
          {selectedRole === role.id && (
            <div className="mt-4">
              <ServerRoleForm
                role={role}
                onSave={onSave}
                error={error}
                loading={loading}
              />
            </div>
          )}
        </>
      ))}
    </div>
  )
}

export default ServerRoles
