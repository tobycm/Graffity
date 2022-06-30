const { MessageEmbed } = require("discord.js");
const config = require("../../../config/config.json");
const ee = require("../../../config/embed.json");
module.exports = {
    name: "volume",
    category: "Music",
    aliases: ["vol", 'volume'],
    cooldown: 4,
    useage: "volume <0-200>",
    description: "Chỉnh âm thanh của bot",
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
      if(!args[0])
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`**🚫 |** Xin hãy ghi % thích hợp!`)
          .setDescription(`Âm lượng hiện tại: \`${client.distube.getQueue(message).volume}%\`\nUsage: \`${prefix}volume <0-200>\``)
        );

      if(!(0 <= Number(args[0]) && Number(args[0]) <= 200))
        return message.channel.send('**🚫 |** Âm lượng quá cao!')

        client.distube.setVolume(message, Number(args[0]));
        return message.channel.send(`**🔊 |** Đã điều chỉnh âm lượng thành: \`${args[0]}%\``)
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