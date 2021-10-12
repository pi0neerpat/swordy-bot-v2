import { Toaster } from '@redwoodjs/web/toast'

const UsersLayout = ({ children }) => {
  return (
    <div className="">
      <Toaster />
      <main className="rw-main">{children}</main>
    </div>
  )
}

export default UsersLayout
