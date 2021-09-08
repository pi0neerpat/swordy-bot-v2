import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

const UsersLayout = ({ children }) => {
  return (
    <div className="rw-scaffold">
      <Toaster />
      <main className="rw-main">{children}</main>
    </div>
  )
}

export default UsersLayout
