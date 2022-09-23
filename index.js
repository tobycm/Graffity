const Discord = require("discord.js")
const colors = require("colors")
const fs = require("fs")
const ee = require('./config/embed.json')
const db = require('quick.db')
const { ownerid } = require("./config/config.json")

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

client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()
client.categories = fs.readdirSync("./commands/")
client.cooldowns = new Discord.Collection()

// ping to search
{
  client.on('message', message => {
    if (message.content.startsWith('<@989739184925343804>')) {
      const { guild } = message
      const langDB = db.get(`lang_${guild.id}`)
      let vietnamese
      if (langDB) vietnamese = true
      if (!langDB) vietnamese = false
      const prefix = db.fetch(`prefix_${message.guild.id}`)
      const Embed = new Discord.MessageEmbed()
      .setTitle(`${vietnamese ? `Prefix của tôi trên server này là [\`${prefix}\`]` : `My prefix in this server is [\`${prefix}\`]`}`)
      .setColor(ee.color)
      message.channel.send({embeds:[Embed]})
    }
  })
}

// handling
var arr = ['command', 'events', 'distube-handler']
arr.forEach(handler => require(`./handlers/${handler}`)(client))
console.log(`✅ Kết nối với quick.db thành công!`.green)
console.log(`✅ Kết nối với Distube thành công!`.blue)

// login bot
client.login(require("./config/config.json").token)