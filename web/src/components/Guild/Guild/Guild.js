import { Link, routes } from '@redwoodjs/router'
import RoleCell from 'src/components/Role/RoleCell'

const Guild = ({ guild }) => {
  return (
    <>
      <div className="mt-8 flex">
        <div className="">
          <img
            className="w-12 h-12  p-12% overflow-hidden"
            src={guild.iconUrl}
            alt={`Guild icon for ${guild.name}`}
          />
        </div>
        <h1 className="tracking-tight font-extrabold text-gray-900 sm:text-2xl md:text-4xl">
          {guild.name}
        </h1>
      </div>
      <Link
        to={routes.editGuild({ id: guild.id })}
        className="rw-button rw-button-green"
      >
        Edit
      </Link>
      <h2 className="mt-12  font-extrabold sm:text-1xl md:text-3xl">Roles</h2>
      {guild.roles.length
        ? guild.roles.map((role, i) => (
            <RoleCell className="mt-4" key={i} id={role.id} />
          ))
        : 'No roles have been set up for this guild'}
    </>
  )
}

export default Guild
