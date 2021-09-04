import { Link, routes } from '@redwoodjs/router'

const Detail = ({ title, text }) => (
  <>
    <h3 className="text-1xl text-gray-800 font-bold leading-none mb-3">
      {title}
    </h3>
    <p className="mb-3" className="mb-5">
      {text}
    </p>
  </>
)

const AboutPage = () => {
  return (
    <>
      <div className="pt-6">
        <h1 className="text-3xl text-gray-800 font-bold leading-none mb-6">
          About ⚔️ Swordy Bot
        </h1>
        <Detail
          title="How does it work?"
          text="We use complicated machine learning ... just kidding! Its actually pretty straightforward. We just check the user's wallet for a tokens. If they own the right ones, then they earn roles in your community's server."
        />
        <Detail
          title="How do I add it to my community?"
          text="Right now only Discord is supported. Simply click the big button on the home page to add the bot to your server."
        />
        <Detail
          title="How do I manage roles?"
          text='Roles are added using the "!add-role" command in your server.'
        />
        <Detail
          title="How do I add roles using Unlock Protocol?"
          text="The flow is the same. We'll automatically detect if your token is using the Unlock Protocl contracts."
        />
        <Detail
          title="What tokens are supported?"
          text="ERC721 NFTs baby! ERC20 too."
        />
        {/*
        <Detail
          title="How do I manage roles?"
          text=""
        />
        */}
      </div>
    </>
  )
}

export default AboutPage
