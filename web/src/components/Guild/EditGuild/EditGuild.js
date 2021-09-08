import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes, Link } from '@redwoodjs/router'
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
      <div className="p-4 rw-segment">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="tracking-tight font-extrabold text-gray-900 sm:text-2xl md:text-4xl">
              Editing:
            </h1>
            <img
              className="w-16 h-16 overflow-hidden"
              src={guild.iconUrl}
              alt={`Guild icon for ${guild.name}`}
            />
            <h1 className="tracking-tight font-extrabold text-gray-900 sm:text-2xl md:text-4xl">
              {guild.name}
            </h1>
          </div>
          <Link
            to={routes.guild({ id: guild.id })}
            className="rw-button rw-button-small"
          >
            View
          </Link>
        </div>
        <div className="mt-4">
          {guild?.roles.length
            ? guild.roles.map((role, i) => (
                <div key={i} className="mt-4">
                  <RoleCell isEditing key={i} id={role.id} />
                </div>
              ))
            : `You haven't set up any roles for this Discord server. Click the "ADD TOKEN ACCESS" button below to get started.`}
        </div>
      </div>
      <div className="mt-6 rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Roles without token access
          </h2>
        </header>
        <div className="rw-segment-main">
          <ServerRolesCell id={guild.id} />
        </div>
      </div>
    </>
  )
}
export default EditGuild
