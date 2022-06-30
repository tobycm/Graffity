const { MessageEmbed } = require("discord.js");
const config = require("../../config/config.json");
const ee = require("../../config/embed.json");
const {delay} = require("../../handlers/functions")
module.exports = {
    name: "resume",
    category: "Music",
    aliases: ["resume", 'unpause'],
    cooldown: 4,
    useage: "resume",
    description: "Tiếp tục bài hát đang dừng",
    run: async (client, message, args, cmduser, text, prefix) => {
    try{
        const { channel } = message.member.voice
        if (!channel) {
          message.channel.send(`**🚫 |** Xin hãy vào một kênh thoại bất kì!`)
          return
        }
        if(!client.distube.getQueue(message))
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`**🚫 |** Queue trống!`)
        )
        if(client.distube.getQueue(message) && channel.id !== message.guild.me.voice.channel.id) {
            message.channel.send(`**🚫 |** Xin hãy vào kênh thoại **của tôi** trước đã!`)
            return
        }
      if(client.distube.isPlaying(message)) {
        return message.channel.send(`**🚫 |** Nhạc không được tạm dừng, không thể unpause `)
      }
      message.channel.send('**▶️ |** Tiếp tục bài hát 🎶')

      client.distube.resume(message);
      //those 4 lines with the delay, fixes the bug that it doesnt resume by repausing and reresuming ;)
      await delay(100);
      client.distube.pause(message);
      await delay(100);
      client.distube.resume(message);
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`**❗️ |** Ôi hỏng rồi | đã xảy ra lỗi!`)
            .setDescription(`\`\`\`${e.stack}\`\`\``)
        );
    }
  }
}