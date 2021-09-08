// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Set, Router, Route } from '@redwoodjs/router'
import GuildsLayout from 'src/layouts/GuildsLayout'
import RolesLayout from 'src/layouts/RolesLayout'
import UsersLayout from 'src/layouts/UsersLayout'
import DefaultLayout from 'src/layouts/DefaultLayout'

const Routes = () => {
  return (
    <Router>
      <Route path="/redirect/{type}" page={RedirectPage} name="redirect" />
      <Set wrap={DefaultLayout}>
        <Route path="/" page={HomePage} name="home" />
        <Route path="/login" page={LoginPage} name="login" />
        <Route path="/about" page={AboutPage} name="about" />
        <Set private unauthenticated="login" wrap={UsersLayout}>
          <Route path="/profile" page={UserUserPage} name="profile" />
        </Set>
        <Set wrap={GuildsLayout}>
          <Route path="/guilds/{id}/edit" page={GuildEditGuildPage} name="editGuild" />
          <Route path="/guilds/new" page={GuildNewGuildPage} name="newGuild" />
          <Route path="/guilds/{id}" page={GuildGuildPage} name="guild" />
        </Set>
      </Set>
    </Router>
  )
}

export default Routes
