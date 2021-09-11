import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes, navigate } from '@redwoodjs/router'
import GuildCell from 'src/components/Guild/GuildCell'
import { PlusIcon, CircleArrowIcon } from 'src/components/Icons'
import { ADD_BOT_LINK } from 'src/helpers/constants'

const User = ({ user }) => {
  return (
    <>
      <div className="flex items-center min-w-min mt-4">
        <div className="min-w-max">
          <img src={user.iconUrl} alt={`Profile image for ${user.username}`} />
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
        {user.guilds.map((guildId, i) => (
          <GuildCell key={i} id={guildId} />
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
      <div>
        <p className="mt-8">Manage your own Discord Server?</p>
        <div className="mt-4 p-4 rw-segment">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center">
                <PlusIcon width="2rem" height="2rem" />
                <div className="ml-4">
                  <h1 className=" tracking-tight font-extrabold text-gray-900 sm:text-2xl m:text-4xl l:text-4xl">
                    New guild
                  </h1>
                </div>
              </div>
            </div>
            <a
              href={ADD_BOT_LINK}
              type="submit"
              className=" rw-button rw-button-green"
            >
              Add Bot
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default User
