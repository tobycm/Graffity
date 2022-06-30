const { MessageEmbed } = require("discord.js");
const config = require("../../../config/config.json");
const ee = require("../../../config/embed.json");
module.exports = {
    name: "shuffle",
    category: "Music",
    aliases: ["mix", 'shuffle'],
    cooldown: 4,
    useage: "shuffle",
    description: "Xáo trộn nhạc tronh queue",
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

      message.channel.send('**🔀 |** Đã xáo trộn nhạc trong Queue')

      client.distube.shuffle(message);
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