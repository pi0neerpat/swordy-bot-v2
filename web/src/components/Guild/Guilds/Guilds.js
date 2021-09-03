import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes } from '@redwoodjs/router'

import { QUERY } from 'src/components/Guild/GuildsCell'

const DELETE_GUILD_MUTATION = gql`
  mutation DeleteGuildMutation($id: String!) {
    deleteGuild(id: $id) {
      id
    }
  }
`

const MAX_STRING_LENGTH = 150

const truncate = (text) => {
  let output = text
  if (text && text.length > MAX_STRING_LENGTH) {
    output = output.substring(0, MAX_STRING_LENGTH) + '...'
  }
  return output
}

const jsonTruncate = (obj) => {
  return truncate(JSON.stringify(obj, null, 2))
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

const GuildsList = ({ guilds }) => {
  const [deleteGuild] = useMutation(DELETE_GUILD_MUTATION, {
    onCompleted: () => {
      toast.success('Guild deleted')
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete guild ' + id + '?')) {
      deleteGuild({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Platform id</th>
            <th>Platform</th>
            <th>Name</th>
            <th>Icon url</th>
            <th>Description</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {guilds.map((guild) => (
            <tr key={guild.id}>
              <td>{truncate(guild.platformId)}</td>
              <td>{truncate(guild.platform)}</td>
              <td>{truncate(guild.name)}</td>
              <td>{truncate(guild.iconUrl)}</td>
              <td>{truncate(guild.description)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.guild({ id: guild.id })}
                    title={'Show guild ' + guild.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editGuild({ id: guild.id })}
                    title={'Edit guild ' + guild.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete guild ' + guild.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(guild.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default GuildsList
