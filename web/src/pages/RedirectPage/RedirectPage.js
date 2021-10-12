import { MetaTags } from '@redwoodjs/web'
import Redirect from 'src/components/Redirect/Redirect'

const RedirectPage = ({ type }) => {
  return (
    <>
      <MetaTags
        title="Redirect"
        // description="Redirect description"
        /* you should un-comment description and add a unique description, 155 characters or less
      You can look at this documentation for best practices : https://developers.google.com/search/docs/advanced/appearance/good-titles-snippets */
      />
      <Redirect type={type} />
    </>
  )
}

export default RedirectPage
