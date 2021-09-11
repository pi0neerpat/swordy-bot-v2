import { Link, routes, navigate } from '@redwoodjs/router'
import RoleUpdate from 'src/components/Role/RoleUpdate'

const ServerRoles = ({ roles, guildId }) => {
  const [selectedRole, setSelectedRole] = React.useState(roles[0].id)

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
              <RoleUpdate role={role} guildId={guildId} />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default ServerRoles
