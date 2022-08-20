const { MessageEmbed } = require("discord.js")
const db = require('quick.db')
const ee = require("../../config/embed.json")
const filters = [
  "3d",
  "bassboost",
  "echo",
  "karaoke",
  "nightcore",
  "vaporwave",
  "flanger",
  "gate",
  "haas",
  "reverse",
  "surround",
  "mcompand",
  "phaser",
  "tremolo",
  "earwax"
]
module.exports = {
    name: "filter",
    category: "Music",
    aliases: ["filter"],
    cooldown: 4,
    useage: "filter <tên filter>",
    description: "Đổi filter cho bài hát",
    run: async (client, message, args, cmduser, text, prefix) => {
    try{
      const { guild } = message
      const langDB = await db.get(`lang_${guild.id}`)
      let vietnamese
      if (langDB) vietnamese = true
      if (!langDB) vietnamese = false
      const { channel } = message.member.voice
      if (!channel) {
        message.channel.send(`${vietnamese ? `**<:cyber_failed:1002595191082983464> |** Xin hãy vào một kênh thoại bất kì!` : `**<:cyber_failed:1002595191082983464> |** Please join a voice first!`}`)
        return
      }
      if(!client.distube.getQueue(message)) {
        const Empty = new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`${vietnamese ? `**<:cyber_failed:1002595191082983464> |** Queue trống!` : `**<:cyber_failed:1002595191082983464> |** Queue is empty!`}`)

      return message.channel.send({embeds:[Empty]})
      }
      if(client.distube.getQueue(message) && channel.id !== message.guild.me.voice.channel.id) {
          message.channel.send(`${vietnamese ? `**<:cyber_failed:1002595191082983464> |** Xin hãy vào kênh thoại **của tôi** trước đã!` : `**<:cyber_failed:1002595191082983464> |** Please join **my voice** first!`}`)
          return
      }
      
      const Input = args[0]
      if(!Input) {
        const Embed = new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`${vietnamese ? `**<:cyber_failed:1002595191082983464> |** Xin hãy ghi tên filter` : `**<:cyber_failed:1002595191082983464> |** Please enter filter name`}`)
        .setImage('https://media.discordapp.net/attachments/965155548611899422/1008285565231312926/unknown.png')
      
        message.channel.send({embeds:[Embed]})
      }

      if (!filters.includes(Input)) return message.reply(`${vietnamese ? `**<:cyber_failed:1002595191082983464> |** Filter này không tồn tại!` : `**<:cyber_failed:1002595191082983464> |** Please enter valid filter name!`}`)
      if (Input === 'off' && client.distube.getQueue(message).filters?.length) client.distube.getQueue(message).setFilter(false)
      else if (Object.keys(client.distube.filters).includes(Input)) client.distube.getQueue(message).setFilter(Input)

      message.channel.send(`${vietnamese ? `**<:cyber_success:1002595116164317204> |** Đã cài filter thành: \`${Input}\`` : `**<:cyber_success:1002595116164317204> |** Set filter to: \`${Input}\``}`)
    } catch (e) {
        console.log(String(e.stack).bgRed)
        const Err = new MessageEmbed()
.setColor(ee.wrongcolor)
.setFooter(ee.footertext, ee.footericon)
.setTitle(`**<:warning:1001866544797716511> |** Ôi hỏng rồi | đã xảy ra lỗi!`)
.setDescription(`\`\`\`${e.stack}\`\`\``)
return message.channel.send({embeds:[Err]})
    }
  }
}