import { Toaster } from '@redwoodjs/web/toast'

const GuildsLayout = ({ children }) => {
  return (
    <div className="">
      <Toaster />
      <main className="rw-main">{children}</main>
    </div>
  )
}

export default GuildsLayout
