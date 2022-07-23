const Discord = require("discord.js")
const colors = require("colors")
const fs = require("fs")
const ee = require('./config/embed.json')
const db = require('quick.db')
const client = new Discord.Client({
  intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_BANS', 'GUILD_VOICE_STATES', 'GUILD_MEMBERS', 'GUILD_EMOJIS_AND_STICKERS',
'GUILD_INTEGRATIONS', 'GUILD_PRESENCES', 'DIRECT_MESSAGES'],
  messageCacheLifetime: 60,
  fetchAllMembers: false,
  messageCacheMaxSize: 10,
  restTimeOffset: 0,
  restWsBridgetimeout: 100,
  disableEveryone: true,
  partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'CHANNEL', 'GUILD_MEMBER'],
})
require('discord-buttons')(client)

client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()
client.categories = fs.readdirSync("./commands/")
client.cooldowns = new Discord.Collection()

// ping to search
client.on('message', message => {
  if (message.content.startsWith('<@989739184925343804>')) {
    const prefix = db.fetch(`prefix_${message.guild.id}`)
    const Embed = new Discord.MessageEmbed()
    .setTitle(`Prefix của tôi trên server này là [\`${prefix}\`]`)
    .setColor(ee.color)
    message.channel.send(Embed)
  }
})

var arr = ["command", "events", "distube-handler"]
arr.forEach(handler => require(`./handlers/${handler}`)(client))
console.log(`✅ Kết nối với quick.db thành công!`.green)

client.login(require("./config/config.json").token)
