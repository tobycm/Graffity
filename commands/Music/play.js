const { MessageEmbed } = require("discord.js");
const ee = require("../../config/embed.json");
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
        message.channel.send(`${vietnamese ? `**🚫 |** Xin hãy vào một kênh thoại bất kì!` : `**🚫 |** Please join a voice first!`}`)
        return
      }
      if(client.distube.getQueue(message) && channel.id !== message.guild.me.voice.channel.id) {
          message.channel.send(`${vietnamese ? `**🚫 |** Xin hãy vào kênh thoại **của tôi** trước đã!` : `**🚫 |** Please join **my voice** first!`}`)
          return
      }
      const search = args.join(' ')
      if(!search)
        return message.channel.send(`${vietnamese ? `**🚫 |** Xin hãy ghi tên/link bài hát!` : `**🚫 |** Please enter song'name/song'link!`}`)
      message.channel.send(new MessageEmbed()
        .setColor(ee.color)
        .setFooter(ee.footertext,ee.footericon)
        .setTitle(`${vietnamese ? `Đang tìm nhạc..` : `Searching the music..`}`)
        .setDescription(`\`\`\`fix\n${search}\n\`\`\``)
      )
      client.distube.play(message, search);
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`**❗️ |** Ôi hỏng rồi | đã xảy ra lỗi!`)
            .setDescription(`\`\`\`${e.stack}\`\`\``)
        )
    }
  }
}