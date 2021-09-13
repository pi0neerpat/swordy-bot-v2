require('dotenv').config()
const Discord = require('discord.js')
const { MessageEmbed } = require('discord.js')

const ApiMgr = require('./apiMgr')

const apiMgr = new ApiMgr()
const discordClient = new Discord.Client()

const DISCORD_NO_DM_INVOCATION = 'Sorry, you can only do that from a server'
const DISCORD_INVALID_PERMISSIONS = `⛈️ Sorry, I'm powerless. Someone must have revoked my permission to manage roles.`
const DISCORD_SERVER_ERROR = `⛈️ Sorry, something went terribly wrong with my circuits. If this keeps happening please contact us: https://discord.gg/Nw3y4GtBSh`

const handleInvoke = async (message) => {
  console.log(`New invocation from ${message.author.username}`)
  try {
    // Verify the bot still has role-granting priveledges
    if (!message.guild.me.hasPermission(['MANAGE_ROLES']))
      return message.channel.send(DISCORD_INVALID_PERMISSIONS)

    const {
      text,
      // url,
      type,
    } = await apiMgr.postMessage({ message })
    const url = text.split(':\n')[1]
    if (type === 'reply') {
      let embed = {
        color: '#0099ff',
        title: `${message.author.username}, ready to be knighted?`,
        description: `[Click here](${url}) to unlock more channels (one-time use)`,
        type: 'link',
      }
      // embed = new MessageEmbed()
      //   .setColor('#0099ff')
      //   .setTitle(`${message.author.username}, ${title}?`)
      //   .setURL(url)
      //   .setDescription(description)
      //   .setFooter('https://swordybot.com')
      return message.channel.send({ embed })
    }
    // TODO: Add embed response type
    // TODO: Add DM message response type
  } catch (e) {
    console.log(e)
    message.reply(DISCORD_SERVER_ERROR)
  }
}

discordClient.once('ready', async () => {
  console.log('Ready!')
})

discordClient.on('message', async (message) => {
  if (process.env.INVOCATION_STRING.split(',').includes(message.content)) {
    if (message.channel.type == 'dm') {
      // Direct messaging the bot won't work - we must know the Guild ID
      return message.reply(DISCORD_NO_DM_INVOCATION)
    }
    handleInvoke(message)
  }
})

discordClient.login(process.env.DISCORD_BOT_TOKEN)
