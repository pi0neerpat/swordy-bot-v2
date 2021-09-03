import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

const TokensLayout = ({ children }) => {
  return (
    <div className="rw-scaffold">
      <Toaster />
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          <Link to={routes.tokens()} className="rw-link">
            Tokens
          </Link>
        </h1>
        <Link to={routes.newToken()} className="rw-button rw-button-green">
          <div className="rw-button-icon">+</div> New Token
        </Link>
      </header>
      <main className="rw-main">{children}</main>
    </div>
  )
}

export default TokensLayout
