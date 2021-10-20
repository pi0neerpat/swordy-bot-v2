const RedirectOptions = ({ options }) => {
  const Button = ({ href, children }) => (
    <div className="w-full justify-center">
      <a
        href={href}
        className="flex items-center hover:underline bg-white text-gray-800 font-bold rounded-full py-4 px-8 shadow-lg"
      >
        {children}
      </a>
    </div>
  )

  const getButton = (option) => {
    if (option.url.includes('unlock-protocol'))
      return (
        <Button href={option.url}>
          {option.roleName} -{' '}
          <img
            className="h-6 ml-2 mr-2"
            src="/unlock.png"
            alt="Unlock Protocol logo"
          />{' '}
          <i>Unlock Protocol</i>
        </Button>
      )

    if (option.text.includes('tools'))
      return (
        <div className="w-full justify-center mt-16">
          <a
            href={option.url}
            className="flex items-center justify-center hover:underline text-gray-800  py-4 px-8 "
          >
            <span role="img" aria-label="Hammer and wrench" className="mr-2">
              🛠️
            </span>{' '}
            {option.text}
          </a>
        </div>
      )
    return (
      <Button href={option.url}>
        {option.roleName} - <i>Standard token (ERC721, ERC20)</i>
      </Button>
    )
  }

  return (
    <div className="sm:text-center lg:text-left ">
      <h1 className="text-2xl ml-4 sm:ml-0 mb-10 tracking-tight font-extrabold text-gray-900 sm:text-5xl">
        Which role do you seek?
      </h1>
      {options.map((option, index) => (
        <div className="mt-6" key={index}>
          {getButton(option)}
        </div>
      ))}
    </div>
  )
}

export default RedirectOptions
