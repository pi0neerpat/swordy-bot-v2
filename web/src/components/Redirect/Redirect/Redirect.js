import DefaultLayout from 'src/layouts/DefaultLayout'

const Redirect = ({ message }) => {
  return (
    <DefaultLayout>
      <div className="mt-8 sm:text-center lg:text-left">
        <h1 className="text-l tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
          ⛈️ Oops! Something went wrong
        </h1>
        <div className=" mt-8 rw-cell-error">{message}</div>
        <p className="mt-8 text-s text-grey-600">
          <b>Please start over in Discord</b>
        </p>
      </div>
    </DefaultLayout>
  )
}

export default Redirect
