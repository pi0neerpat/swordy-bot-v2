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
          Unlock Protocol
        </Button>
      )

    if (option.text.includes('tools'))
      return <Button href={option.url}>{option.text}</Button>
    return (
      <Button href={option.url}>
        {option.roleName} - Standard token (ERC721 or ERC20)
      </Button>
    )
  }

  return (
    <div className="sm:text-center lg:text-left">
      <h1 className="text-2xl ml-4 sm:ml-0 mb-10 tracking-tight font-extrabold text-gray-900 sm:text-5xl ">
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
