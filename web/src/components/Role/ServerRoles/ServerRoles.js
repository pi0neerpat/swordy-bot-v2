import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes, navigate } from '@redwoodjs/router'

const ServerRoles = ({ roles }) => {
  const onSubmit = () => {}
  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role.id}>
              <td>{role.id}</td>
              <td>{role.name}</td>
              <td>
                <nav className="rw-table-actions">
                  <button
                    type="button"
                    title={'Setup role ' + role.id}
                    className="rw-button rw-button-small rw-button-green"
                    onClick={() => onSubmit(role.id)}
                  >
                    Setup
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

export default ServerRoles
