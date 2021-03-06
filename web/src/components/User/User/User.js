import GuildCell from 'src/components/Guild/GuildCell'
import { CircleArrowIcon } from 'src/components/Icons'
import BotButton from 'src/components/BotButton'

const User = ({ user }) => {
  return (
    <>
      <div className="flex items-center min-w-min mt-4">
        <div className="min-w-max">
          <img
            className="w-16"
            src={user.iconUrl || '/emptyUser.png'}
            alt={`Profile for ${user.username}`}
          />
        </div>
        <div className="ml-4">
          <h1 className="tracking-tight font-extrabold text-gray-900 text-xl sm:text-2xl md:text-4xl">
            {user.username}
          </h1>
          <p className="break-all text-xs sm:text-lg">{user.address}</p>
        </div>
      </div>
      <p className="mt-8">Guilds you&apos;ve used with Swordy Bot:</p>

      {user.currentSessionGuild ? (
        <div className="mt-4">
          <GuildCell guildId={user.currentSessionGuild.id} />
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
            <GuildCell key={i} guildId={guild.id} />
          ))}
      </div>
      <div>
        <p className="mt-8">Don&apos;t see your server listed?</p>
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
