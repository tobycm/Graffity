const Discord = require("discord.js")
const colors = require("colors")
const fs = require("fs")

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
});

client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()
client.categories = fs.readdirSync("./commands/")
client.cooldowns = new Discord.Collection()

var arr = ["command", "events", "distube-handler"]
arr.forEach(handler => require(`./handlers/${handler}`)(client))
console.log(`✅ Kết nối với quick.db thành công!`.green)

client.login(require("./config/config.json").token)