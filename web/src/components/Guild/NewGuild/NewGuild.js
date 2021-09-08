import { navigate } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import { ADD_BOT_LINK } from 'src/constants'

const NewGuild = () => {
  return (
    <>
      <MetaTags
        title="New Guild"
        // description="Home description"
        /* you should un-comment description and add a unique description, 155 characters or less
  You can look at this documentation for best practices : https://developers.google.com/search/docs/advanced/appearance/good-titles-snippets */
      />

      <div className="mt-8 sm:text-center lg:text-left">
        <h1 className="text-l tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
          👋 Let's get started!
        </h1>
        <p className="mt-4">Add the bot to your server 👇👇👇 </p>
        <div className="mt-8 w-1/4">
          <a
            href={ADD_BOT_LINK}
            type="submit"
            className=" rw-button rw-button-green"
          >
            Add Bot
          </a>
        </div>
      </div>
    </>
  )
}

export default NewGuild
