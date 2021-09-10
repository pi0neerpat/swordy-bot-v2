import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes, navigate } from '@redwoodjs/router'
import RoleUpdateForm from 'src/components/Role/RoleUpdateForm'

const UPDATE_GUILD_ROLE_MUTATION = gql`
  mutation updateGuildRoleMutation(
    $id: String!
    $input: UpdateGuildRoleInput!
  ) {
    updateGuildRole(id: $id, input: $input) {
      id
    }
  }
`

const ServerRoles = ({ roles, guildId }) => {
  const [selectedRole, setSelectedRole] = React.useState(roles[0].id)
  const [addGuildRole, { loading, error }] = useMutation(
    UPDATE_GUILD_ROLE_MUTATION,
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
        input: { id, input },
      },
    })
  }

  const onSubmit = () => {}
  return (
    <div>
      {roles.map((role) => (
        <div className="rw-segment p-4 mt-4" key={role.id}>
          <div className="flex flex-wrap justify-between items-center">
            <div className="items-center">
              <h2 className="text-2xl">{role.name}</h2>
            </div>
            <button
              type="button"
              className="rw-button rw-button-green mt-4 sm:mt-0"
              onClick={() =>
                setSelectedRole(selectedRole === role.id ? null : role.id)
              }
            >
              Add Token Access
            </button>
          </div>
          {selectedRole === role.id && (
            <div className="mt-8">
              <RoleUpdateForm
                role={role}
                onSave={onSave}
                error={error}
                loading={loading}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default ServerRoles
