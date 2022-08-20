const { MessageEmbed } = require("discord.js")
const db = require('quick.db')
const ee = require("../../config/embed.json")
const { format } = require("../../handlers/functions")
module.exports = {
    name: "forward",
    category: "Music",
    aliases: ["fwd", 'forward'],
    cooldown: 4,
    useage: "forward <giây>",
    description: "Tua đi một khoảng thời gian nhất định",
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
      const Int = Number(args[0])
      if(!Int) return message.channel.send(`${vietnamese ? `**<:cyber_failed:1002595191082983464> |** Xin hãy ghi số giây mà bạn muốn tua đi!` : `**<:cyber_failed:1002595191082983464> |** Please enter the number of seconds you want to forward!`}`)

      if (isNaN(Int)) return message.channel.send(`${vietnamese ? `**<:cyber_failed:1002595191082983464> |** Xin hãy nhập số giây hợp lệ!` : `**<:cyber_failed:1002595191082983464> |** Please enter a valid number!`}`)

      let queue = client.distube.getQueue(message)
      let seektime = queue.currentTime + Int * 1000
      if(seektime < 0)
        seektime = queue.songs[0].duration * 1000
      if(seektime >= queue.songs[0].duration * 1000)
        seektime = queue.songs[0].duration * 1000 - 1000
      queue.seek(Int)

      message.channel.send(`${vietnamese ? `**⏩ |** Đã tua đi **${Int} giây**` : `**⏩ |** Forwarded **${Int} seconds**`}`)
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