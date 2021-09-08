import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes, navigate } from '@redwoodjs/router'
import RoleCell from 'src/components/Role/RoleCell'

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
  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            <div className="flex">
              <img
                width={100}
                src={guild.iconUrl}
                alt={`Guild icon for ${guild.name}`}
              />{' '}
              {guild.name}
            </div>
            <Link
              to={routes.editGuild({ id: guild.id })}
              className="rw-button rw-button-green"
            >
              <div className="rw-button-icon">🛠️</div> Edit
            </Link>
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            {guild.roles.length
              ? guild.roles.map((role, i) => <RoleCell key={i} id={role.id} />)
              : 'No roles have been set up for this guild'}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Guild
