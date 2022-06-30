const { MessageEmbed } = require("discord.js");
const config = require("../../config/config.json");
const ee = require("../../config/embed.json");
module.exports = {
    name: "pause",
    category: "Music",
    aliases: ["pause"],
    cooldown: 4,
    useage: "pause",
    description: "Tạm dừng nhạc đang phát",
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
        );
        if(client.distube.getQueue(message) && channel.id !== message.guild.me.voice.channel.id) {
            message.channel.send(`**🚫 |** Xin hãy vào kênh thoại **của tôi** trước đã!`)
            return
        }
      if(client.distube.isPaused(message)) {
        return message.channel.send('**🚫 |** Nhạc đã tạm dừng rồi')
      }
      message.channel.send('**⏸ |** Đã tạm dừng nhạc!')

      client.distube.pause(message);
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