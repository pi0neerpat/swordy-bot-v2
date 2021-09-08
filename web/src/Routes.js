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
import TokensLayout from 'src/layouts/TokensLayout'
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
          <Route path="/users/{id}" page={UserUserPage} name="user" />
          <Route path="/users" page={UserUsersPage} name="users" />
        </Set>
        <Set wrap={GuildsLayout}>
          <Route path="/guilds/{id}/edit" page={GuildEditGuildPage} name="editGuild" />
          <Route path="/guilds/new" page={GuildNewGuildPage} name="newGuild" />
          <Route path="/guilds/{id}" page={GuildGuildPage} name="guild" />
        </Set>
        <Set wrap={RolesLayout}>
          <Route path="/roles/new" page={RoleNewRolePage} name="newRole" />
          <Route path="/roles/{id}/edit" page={RoleEditRolePage} name="editRole" />
          <Route path="/roles/{id}" page={RoleRolePage} name="role" />
          <Route path="/roles" page={RoleRolesPage} name="roles" />
        </Set>
        <Set wrap={TokensLayout}>
          <Route path="/tokens/new" page={TokenNewTokenPage} name="newToken" />
          <Route path="/tokens/{id}/edit" page={TokenEditTokenPage} name="editToken" />
          <Route path="/tokens/{id}" page={TokenTokenPage} name="token" />
          <Route path="/tokens" page={TokenTokensPage} name="tokens" />
          <Route notfound page={NotFoundPage} />
        </Set>
      </Set>
    </Router>
  )
}

export default Routes
