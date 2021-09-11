<h1 align="center">Welcome swordy-bot 👋</h1>
<p>
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

> An Ethereum wallet verification service for role-gated Discord servers.

## Whats included

- **🤖 Discord bot `/bot`**
- **🛰️ Redwood api server `/api`**
- **🖥️ Redwood web app `/web`**

## Development

Install both the app and bot

```bash
# Redwood
yarn

# Discord Bot
cd bot && yarn
```

Start the bot

```bash
# In /bot, update the variables here
cp .env.template .env

yarn start
```

Set up the Redwood App

```bash
# In root of the repo, update the variables here
cp .env.template .env


# Create a new database and perform migrations
yarn rw prisma migrate dev
```

Start Prisma Studio (database admin tool)

```bash
yarn rw prisma studio
```

Start both the Redwood frontend and api

```bash
yarn rw dev
```

## Going to Production

The easiest way to deploy is using Vercel for the frontend and backend, and Heroku for the bot and postgres database. Hosting this way is free, and can be setup in about 10 minutes.

In order to collect all the required environment variables, you'll need to deploy all three parts (bot, FE+BE, discord app), then go back and update the env variables as necessary.

### Vercel - Backend + Frontend

Create a new Vercel app using your forked repo. The build commands are automatically detected for RedwoodJS projects.

Update the environment variables for what you see in the Redwood `.env` file (root of this repo). You will get `DATABASE` from your Heroku database in the next step.

### Heroku - Bot

Heroku doesn't like apps that aren't in the root folder. To get around this, I added a `heroku-prebuild` script in the root `package.json` which installs the bot dependencies. The Procfile runs `bot.js` as a dyno.

Once deployed, head to the "Resources" tab for this Heroku app, turn off the `web` Dyno, and turn on the `worker` Dyno. This Dyno is defined in the repo root `Procfile`.

Update the config environment variables in "Settings" tab to reflect what you see in the `.template.env` file in `/bot`.

Create a new **postgres add-on** in this Heroku app, and add the url to the Vercel environment as `DATABASE`.

### Discord

Create a new application at https://discord.com/developers. Don't worry about naming here.

In the Discord Developer Portal open the "Bot" tab and create a bot. Choose a username and Icon.

Copy the `TOKEN` and add it to both the bot and redwood app environment variables `DISCORD_BOT_TOKEN`

Next open the "OAUTH" tab, and save these variables to the redwood app environment. `CLIENT ID` as `DISCORD_PUBLIC_CLIENT_ID` and `CLIENT SECRET` as `DISCORD_CLIENT_SECRET`

Add a REDIRECT for your application eg `http://192.168.4.69:8910/redirect/discord`

Last, you'll add the bot to your server. In the developer portal, in "General Information", copy the `Application ID`. Insert this into this URL, and send it to whoever you want to add the bot.

```
# Add the bot with role management permissions

https://discord.com/api/oauth2/authorize?client_id=<Application ID>&permissions=8&scope=bot%20applications.commands
```

## Docker option

If you want to avoid Heroku for the bot, you can use docker.

> Note: avoiding Heroku means you'll also need to bring your own postgres database. See the docs for [self-hosting redwood](https://redwoodjs.com/cookbook/self-hosting-redwood.html#self-hosting-redwood).

If you've made changes to the bot, generate your own Docker image.

```bash
# Build
docker build -t <your username>/unlock-protocol-discord-bot .

# Test it out
docker run -p 8080:8080 -d <your username>/unlock-protocol-discord-bot

# Publish it when ready!
```

When you're ready to host the container, clone this repo on your server and navigate to this package. If you published your own version, the update the image name in `docker-compose.yml`. Be sure to update your `.env` file on the new machine as well.

```bash
# Load the .env file
source .env

# Start in "detached" mode
docker-compose up -d
```

## Troubleshooting + Tips

- If you have permissions errors, try giving the bot a higher role. Bots can only give roles to members in a _lower position_ than their own highest role. See https://discord.com/developers/docs/topics/permissions#permission-hierarchy
- Make an "emoji-reaction" menu https://discordjs.guide/popular-topics/reactions.html#awaiting-reactions

## Author

👤 **Patrick Gallagher**

- Website: https://patrickgallagher.dev
  - Twitter: [@pi0neerpat](https://twitter.com/pi0neerpat)
  - GitHub: [@pi0neerpat](https://github.com/pi0neerpat)

## Show your support

Give a ⭐️ if this project helped you!

## Sponsors

Big thanks to the [Unlock Protocol](unlock-protocol.com) developer grants program for providing support for this project!

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
