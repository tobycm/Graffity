const { MessageEmbed } = require("discord.js")
const ee = require("../../config/embed.json")
const db = require('quick.db')
module.exports = {
    name: "play",
    category: "Music",
    aliases: ["p", "play"],
    cooldown: 4,
    useage: "play <Link/tên nhạc>",
    description: "Phát một bản nhạc từ youtube",
    run: async (client, message, args) => {
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
      if(client.distube.getQueue(message) && channel.id !== message.guild.me.voice.channel.id) {
          message.channel.send(`${vietnamese ? `**<:cyber_failed:1002595191082983464> |** Xin hãy vào kênh thoại **của tôi** trước đã!` : `**<:cyber_failed:1002595191082983464> |** Please join **my voice** first!`}`)
          return
      }
      const search = args.join(' ')
      if(!search) {
        message.channel.send(`${vietnamese ? `**<:cyber_failed:1002595191082983464> |** Xin hãy ghi tên/link bài hát!` : `**<:cyber_failed:1002595191082983464> |** Please enter song'name/song'link!`}`)
        return
      }

      const result = new MessageEmbed()
      .setColor(ee.color)
      .setFooter(ee.footertext,ee.footericon)
      .setTitle(`🔎 ~ ${vietnamese ? `Đang tìm nhạc..` : `Searching the music..`}`)
      .setDescription(`\`\`\`fix\n${search}\n\`\`\``)
    
      const msg = await message.channel.send({embeds:[result]})
      setTimeout(() => msg.delete(), 9000)

      client.distube.play(message.member.voice.channel, search, {
        member: message.member,
        textChannel: message.channel,
        message
      })
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
