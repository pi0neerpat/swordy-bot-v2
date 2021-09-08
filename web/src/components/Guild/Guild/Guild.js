import { Link, routes } from '@redwoodjs/router'
import RoleCell from 'src/components/Role/RoleCell'

const Guild = ({ guild }) => {
  return (
    <div className="p-4 rw-segment">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
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
      <p className="mt-8">Roles available for token access:</p>
      <div className="mt-4">
        {guild.roles.length ? (
          guild.roles.map((role, i) => (
            <div key={i} className="mt-4">
              <RoleCell id={role.id} />
            </div>
          ))
        ) : (
          <>
            Admins for this Discord server have not set up any roles yet. Click
            the "Edit" button to get started
          </>
        )}
      </div>
    </div>
  )
}

export default Guild
