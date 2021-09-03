import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

const GuildsLayout = ({ children }) => {
  return (
    <div className="rw-scaffold">
      <Toaster />
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          <Link to={routes.guilds()} className="rw-link">
            Guilds
          </Link>
        </h1>
        <Link to={routes.newGuild()} className="rw-button rw-button-green">
          <div className="rw-button-icon">+</div> New Guild
        </Link>
      </header>
      <main className="rw-main">{children}</main>
    </div>
  )
}

export default GuildsLayout
