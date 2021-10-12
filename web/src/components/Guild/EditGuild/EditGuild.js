import { routes, Link } from '@redwoodjs/router'
import RoleCell from 'src/components/Role/RoleCell'
import ServerRolesCell from 'src/components/Role/ServerRolesCell'

const EditGuild = ({ guild }) => {
  return (
    <div className="p-4">
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
      <p className="mt-8">Roles with token access:</p>
      <div className="mt-4">
        {guild?.roles.length ? (
          guild.roles.map((role, i) => (
            <div key={i} className="mt-4">
              <RoleCell isEditing key={i} id={role.id} />
            </div>
          ))
        ) : (
          <div className="rw-segment p-4 text-gray-500">
            You haven't set up any roles for this Discord server. Click "Add
            Token Access" to get started.
          </div>
        )}
      </div>
      <p className="mt-8">Roles without token access:</p>
      <ServerRolesCell id={guild.id} />
    </div>
  )
}
export default EditGuild
