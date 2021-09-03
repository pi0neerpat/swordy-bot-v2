import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes, navigate } from '@redwoodjs/router'

const DELETE_GUILD_MUTATION = gql`
  mutation DeleteGuildMutation($id: String!) {
    deleteGuild(id: $id) {
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

const Guild = ({ guild }) => {
  const [deleteGuild] = useMutation(DELETE_GUILD_MUTATION, {
    onCompleted: () => {
      toast.success('Guild deleted')
      navigate(routes.guilds())
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete guild ' + id + '?')) {
      deleteGuild({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Guild {guild.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Platform id</th>
              <td>{guild.platformId}</td>
            </tr>
            <tr>
              <th>Platform</th>
              <td>{guild.platform}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{guild.name}</td>
            </tr>
            <tr>
              <th>Icon url</th>
              <td>{guild.iconUrl}</td>
            </tr>
            <tr>
              <th>Description</th>
              <td>{guild.description}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editGuild({ id: guild.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(guild.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Guild
