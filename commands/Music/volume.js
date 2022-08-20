const { MessageEmbed } = require("discord.js")
const db = require('quick.db')
const ee = require("../../config/embed.json")
module.exports = {
    name: "volume",
    category: "Music",
    aliases: ["vol", 'volume'],
    cooldown: 4,
    useage: "volume <0-200>",
    description: "Chỉnh âm thanh của bot",
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

      const queue = client.distube.getQueue(message)
      const Int = Number(args[0])
      if(!Int)
        return message.channel.send((`${vietnamese ? `**<:cyber_failed:1002595191082983464> |** Xin hãy ghi % thích hợp!` : `**<:cyber_failed:1002595191082983464> |** Please enter the number of volume!`}`))

      if(Int < 0 || Int > 200)
        return message.channel.send(`${vietnamese ? `**<:cyber_failed:1002595191082983464> |** Âm lượng quá cao hoặc quá thấp! \`0 - 200\`` : `**<:cyber_failed:1002595191082983464> |** Volume is too high or too low! \`0 - 200\``}`)

        queue.setVolume(Int)
        return message.channel.send(`${vietnamese ? `**🔊 |** Đã điều chỉnh âm lượng thành: \`${Int}%\`` : `**🔊 |** Changed the Volume to: \`${Int}%\``}`)
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