import { Link, routes } from '@redwoodjs/router'

const GuildStats = ({ guild }) => {
  return (
    <div className="mt-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center flex-wrap">
          <img
            className="w-16 h-16 overflow-hidden"
            src={guild.iconUrl || '/emptyUser.png'}
            alt={`Guild icon for ${guild.name}`}
          />
          <div className="ml-4">
            <h1 className=" tracking-tight font-extrabold text-gray-900 sm:text-xl md:text-2xl">
              {guild.name}
            </h1>
          </div>
        </div>
        {/*  <div>{guild.userCount} Users</div>*/}
      </div>
    </div>
  )
}

export default GuildStats
