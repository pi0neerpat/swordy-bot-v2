import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes, navigate } from '@redwoodjs/router'
import GuildCell from 'src/components/Guild/GuildCell'

const DELETE_USER_MUTATION = gql`
  mutation DeleteUserMutation($id: String!) {
    deleteUser(id: $id) {
      id
    }
  }
`

const jsonDisplay = (obj) => {
  return (
    <pre>
      <code>{JSON.stringify(obj, null, 2)}</code>
    </pre>
  )
}

const timeTag = (datetime) => {
  return (
    <time dateTime={datetime} title={datetime}>
      {new Date(datetime).toUTCString()}
    </time>
  )
}

const checkboxInputTag = (checked) => {
  return <input type="checkbox" checked={checked} disabled />
}

const User = ({ user }) => {
  const [deleteUser] = useMutation(DELETE_USER_MUTATION, {
    onCompleted: () => {
      toast.success('User deleted')
      navigate(routes.users())
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete user ' + id + '?')) {
      deleteUser({ variables: { id } })
    }
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img
            className="w-16 h-16 overflow-hidden"
            src={user.iconUrl}
            alt={`Profile image for ${user.username}`}
          />
          <h1 className="tracking-tight font-extrabold text-gray-900 sm:text-2xl md:text-4xl">
            {user.username}
          </h1>
        </div>
      </div>
      <p className="mt-4">
        Here are all the guilds you've used with Swordy Bot:
      </p>

      <div className="mt-8">
        <GuildCell id={user.currentSessionGuild.id} />
      </div>
      <div className="mt-8">
        {user.guilds.map((guildId, i) => (
          <GuildCell key={i} id={guildId} />
        ))}
      </div>
    </>
  )
}

export default User
