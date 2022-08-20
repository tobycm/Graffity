const ee = require("../../config/embed.json")
const Discord = require("discord.js")
const { escapeRegex } = require("../../handlers/functions")
const db = require('quick.db')

const validatePermissions = (permissions) => {
  const validPermissions = [
    'CREATE_INSTANT_INVITE',
    'KICK_MEMBERS',
    'BAN_MEMBERS',
    'ADMINISTRATOR',
    'MANAGE_CHANNELS',
    'MANAGE_GUILD',
    'ADD_REACTIONS',
    'VIEW_AUDIT_LOG',
    'PRIORITY_SPEAKER',
    'STREAM',
    'VIEW_CHANNEL',
    'SEND_MESSAGES',
    'SEND_TTS_MESSAGES',
    'MANAGE_MESSAGES',
    'EMBED_LINKS',
    'ATTACH_FILES',
    'READ_MESSAGE_HISTORY',
    'MENTION_EVERYONE',
    'USE_EXTERNAL_EMOJIS',
    'VIEW_GUILD_INSIGHTS',
    'CONNECT',
    'SPEAK',
    'MUTE_MEMBERS',
    'DEAFEN_MEMBERS',
    'MOVE_MEMBERS',
    'USE_VAD',
    'CHANGE_NICKNAME',
    'MANAGE_NICKNAMES',
    'MANAGE_ROLES',
    'MANAGE_WEBHOOKS',
    'MANAGE_EMOJIS',
  ]

  for (const permission of permissions) {
    if (!validPermissions.includes(permission)) {
      throw new Error(`quyền không xác định: "${permission}"`)
    }
  }
}

module.exports = async (client, message, commandOptions) => {
  try {// options ngôn ngữ
    const { guild } = message
    const langDB = db.get(`lang_${guild.id}`)
    let vietnamese
    if (langDB) vietnamese = true
    if (!langDB) vietnamese = false

    // tin nhắn trong DMs
    if (!message.guild) return
    // author là bot
    if (message.author.bot) return
    if (message.channel.partial) await message.channel.fetch()
    if (message.partial) await message.fetch()
    // prefix tùy chỉnh
    const { prefix } = require('../../config/config.json')
    let sv_prefix = db.fetch(`prefix_${message.guild.id}`)
    if(sv_prefix === null) sv_prefix = db.set(`prefix_${message.guild.id}`, prefix)
    const prefixRegex = new RegExp(`^(<@!?>|${escapeRegex(sv_prefix)})\\s*`)

    // reset prefix khẩn cấp
    if (message.content === 'reset') {
      message.react('✅')
      db.set(`prefix_${message.guild.id}`, prefix)
    }
    
    // log lỗi
    if (!prefixRegex.test(message.content)) return
    const [, matchedPrefix] = message.content.match(prefixRegex)
    const args = message.content.slice(matchedPrefix.length).trim().split(/ +/)
    const cmd = args.shift().toLowerCase()
    // lệnh không tồn tại
    if (cmd.length === 0) return message.channel.send(`${vietnamese ? `**<:cyber_failed:1002595191082983464> |** Lệnh lạ, nhập để được trợ giúp! **\`${prefix}help\`**` : `**<:cyber_failed:1002595191082983464> |** Weird command, please type this command to get the help! **\`${prefix}help\`**`}`)
    // Tính tổng lệnh
    let command = client.commands.get(cmd)
    // check alias
    if (!command) command = client.commands.get(client.aliases.get(cmd))
    // set lệnh hợp lệ
    if (command){
        if (!client.cooldowns.has(command.name)) {
            client.cooldowns.set(command.name, new Discord.Collection())
        }

        // cooldown lệnh
        const now = Date.now()
        const timestamps = client.cooldowns.get(command.name)
        const cooldownAmount = (command.cooldown || 1.5) * 1000
        if (timestamps.has(message.author.id)) {
          const expirationTime = timestamps.get(message.author.id) + cooldownAmount
          if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000
            const toofast = await message.channel.send(`${vietnamese ? `**<:cyber_failed:1002595191082983464> |** Bạn dùng nhanh quá đó, hãy đợi ${timeLeft.toFixed(1)} giây!` : `**<:cyber_failed:1002595191082983464> |** uh ho.. You use too fast, please wait ${timeLeft.toFixed(1)} seconds!`}`)
            setTimeout(() => toofast.delete(), 5000)
          }
        }
        timestamps.set(message.author.id, now)
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount)
      try{
        // tin nhắn bị xóa
        try{}catch{}
        // bot bị thiếu quyền hạn
        if(!message.guild.me.permissions.has('ADMINISTRATOR')){
          return message.channel.send(`${vietnamese ? `**<:cyber_failed:1002595191082983464> |** Thiếu quyền hạn!, quyền yêu cầu: \`Administrator\`` : `**<:cyber_failed:1002595191082983464> |** I missing permission!, require permission: \`Administrator\``}`)
        }
        // function handle
        command.run(client, message, args, message.member, args.join(" "), prefix)
      }catch (e) {
        // Lệnh bị lỗi
        console.log(String(e.stack).red)
        const ErrReport = new Discord.MessageEmbed()
        .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle("**<:cyber_failed:1002595191082983464> |** Có trục trặc kĩ thuật, lệnh: `" + command.name + "`")
        .setDescription(`\`\`\`${e.message}\`\`\``)
        
        // Err commando
        return message.channel.send({embeds:[ErrReport]})
      }
    }
    else {
      // Lệnh lạ 
      const msg = await message.channel.send(`${vietnamese ? `**<:cyber_failed:1002595191082983464> |** Lệnh lạ, nhập để được trợ giúp! **\`${prefix}help\`**` : `**<:cyber_failed:1002595191082983464> |** weird command, type this command to get the help! **\`${prefix}help\`**`}`)
      setTimeout(() => msg.delete(), 5000)
    }
  } catch (e) {
    // nothing
  }
}