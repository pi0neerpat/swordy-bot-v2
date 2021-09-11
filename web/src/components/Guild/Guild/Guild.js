import { Link, routes } from '@redwoodjs/router'
import RoleCell from 'src/components/Role/RoleCell'

const Guild = ({ guild }) => {
  const inactiveRoles = guild.roles.filter((role) => !role.userHasRole)
  const activeRoles = guild.roles.filter((role) => role.userHasRole)

  return (
    <div className="p-4 mt-4 rw-segment">
      <div className="flex items-center justify-between">
        <div className="flex items-center flex-wrap">
          <img
            className="w-16 h-16 overflow-hidden"
            src={guild.iconUrl}
            alt={`Guild icon for ${guild.name}`}
          />
          <div className="ml-4">
            <h1 className=" tracking-tight font-extrabold text-gray-900 sm:text-2xl md:text-4xl">
              {guild.name}
            </h1>
          </div>
        </div>
        {guild.isUserManager && (
          <Link
            to={routes.editGuild({ id: guild.id })}
            className="rw-button rw-button-small"
          >
            Edit Guild
          </Link>
        )}
      </div>
      <p className="mt-8">Your roles:</p>
      <div className="mt-4">
        {activeRoles.length ? (
          activeRoles.map((role, i) => <RoleCell id={role.id} key={i} />)
        ) : (
          <div className="rw-segment p-4 text-gray-500">
            Click "Sync Role" to add a role
          </div>
        )}
      </div>
      <p className="mt-8">Available roles:</p>
      <div className="mt-4">
        {inactiveRoles.length ? (
          inactiveRoles.map((role, i) => <RoleCell id={role.id} key={i} />)
        ) : (
          <div className="rw-segment p-4 text-gray-500">
            You have all the roles Swordy Bot manages. Congrats!
          </div>
        )}
      </div>
    </div>
  )
}

export default Guild
