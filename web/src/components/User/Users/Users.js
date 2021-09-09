import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes } from '@redwoodjs/router'

const MAX_STRING_LENGTH = 150

const UsersList = ({ users }) => {
  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Platform id</th>
            <th>Platform</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link
                  to={routes.user({ id: user.id })}
                  title={'Show user ' + user.id + ' detail'}
                  className="rw-button rw-button-small"
                >
                  {truncate(user.id)}
                </Link>
              </td>
              <td>{truncate(user.platformId)}</td>
              <td>{truncate(user.platform)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UsersList
