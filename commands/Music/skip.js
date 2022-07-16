const Discord = require("discord.js");
const ee = require("../../config/embed.json");
const db = require('quick.db')
module.exports = {
    name: 'skip',
    category: 'Music',
    aliases: ['skip'],
    cooldown: 4,
    useage: 'skip',
    description: 'Bỏ qua nhạc đang phát',
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
      if (!client.distube.getQueue(message)) {
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`${vietnamese ? `**🚫 |** Queue trống!` : `**🚫 |** Queue is empty!`}`)
      }
      if(client.distube.getQueue(message) && channel.id !== message.guild.me.voice.channel.id) {
          message.channel.send(`${vietnamese ? `**🚫 |** Xin hãy vào kênh thoại **của tôi** trước đã!` : `**🚫 |** Please join **my voice** first!`}`)
          return
      }
      message.channel.send(`${vietnamese ? `**✅ |** Đã skip bài hiện tại!` : `**✅ |** Skipped the current track!`}`)
      client.distube.skip(message)
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return message.channel.send(new Discord.MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`**❗️ |** Ôi hỏng rồi | đã xảy ra lỗi!`)
            .setDescription(`\`\`\`${e.stack}\`\`\``)
        )
    }
  }
}
