import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes, navigate } from '@redwoodjs/router'
import GuildCell from 'src/components/Guild/GuildCell'
import { PlusIcon, CircleArrowIcon } from 'src/components/Icons'
import BotButton from 'src/components/BotButton'

const User = ({ user }) => {
  return (
    <>
      <div className="flex items-center min-w-min mt-4">
        <div className="min-w-max">
          <img
            className="w-16"
            src={user.iconUrl || '/emptyUser.png'}
            alt={`Profile image for ${user.username}`}
          />
        </div>
        <div className="ml-4">
          <h1 className="tracking-tight font-extrabold text-gray-900 text-xl sm:text-2xl md:text-4xl">
            {user.username}
          </h1>
          <p className="break-all text-xs sm:text-lg">{user.address}</p>
        </div>
      </div>
      <p className="mt-8">Guilds you've used with Swordy Bot:</p>

      {user.currentSessionGuild ? (
        <div className="mt-4">
          <GuildCell id={user.currentSessionGuild.id} />
        </div>
      ) : (
        <div className="mt-4 p-4 rw-segment text-gray-500">
          No Guilds found. Please start over in Discord.
        </div>
      )}
      <div className="mt-8">
        {user.guilds
          .filter((guild) => guild.id !== user.currentSessionGuild.id)
          .map((guild, i) => (
            <GuildCell key={i} id={guild.id} />
          ))}
      </div>
      <div>
        <p className="mt-8">Don't see your server listed?</p>
        <div className="mt-4 p-4 rw-segment">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <CircleArrowIcon width="2rem" height="2rem" />
              <div className="ml-4">
                <h1 className=" tracking-tight font-extrabold text-gray-900 sm:text-2xl m:text-4xl l:text-4xl">
                  Start over in Discord
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 mb-16">
        <p className="mb-8">Manage your own Discord Server?</p>
        <BotButton />
      </div>
    </>
  )
}

export default User
