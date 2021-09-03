import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

const RolesLayout = ({ children }) => {
  return (
    <div className="rw-scaffold">
      <Toaster />
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          <Link to={routes.roles()} className="rw-link">
            Roles
          </Link>
        </h1>
        <Link to={routes.newRole()} className="rw-button rw-button-green">
          <div className="rw-button-icon">+</div> New Role
        </Link>
      </header>
      <main className="rw-main">{children}</main>
    </div>
  )
}

export default RolesLayout
