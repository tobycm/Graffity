const Discord = require("discord.js");
const ee = require("../../config/embed.json");
module.exports = {
    name: 'stop',
    category: 'Music',
    aliases: ['stop'],
    cooldown: 4,
    useage: 'stop',
    description: 'stop the current track',
    run: async (client, message, args) => {
    try{
      const { channel } = message.member.voice
      if (!channel) {
        message.channel.send(`**🚫 |** Xin hãy vào một kênh thoại bất kì!`)
        return
      }
      if (client.distube.getQueue(message) && channel.id !== message.guild.me.voice.channel.id) {
        message.channel.send(`**🚫 |** Xin hãy vào kênh thoại **của tôi** trước đã!`)
        return
      }
      message.channel.send('**✅ |** Đã dừng phát nhạc!')
      client.distube.stop(message)
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
