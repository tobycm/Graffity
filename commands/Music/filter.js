const { MessageEmbed } = require("discord.js");
const config = require("../../config/config.json");
const ee = require("../../config/embed.json");
const filters = [
  "clear",
  "lowbass",
  "bassboost",
  "purebass",
  "8D",
  "vaporwave",
  "nightcore",
  "phaser",
  "tremolo",
  "vibrato",
  "reverse",
  "treble",
  "normalizer",
  "surrounding",
  "pulsator",
  "subboost",
  "karaoke",
  "flanger",
  "gate",
  "haas",
  "mcompand"
]
module.exports = {
    name: "filter",
    category: "Music",
    aliases: ["filter"],
    cooldown: 4,
    useage: "filter <tên filter>",
    description: "Đổi filter cho bài hát",
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
          .setTitle(`**🚫 |** Xin hãy ghi tên filter`)
          .setImage('https://media.discordapp.net/attachments/989398678093565965/991617234290094150/unknown.png')
        );
        if(!filters.join(" ").toLowerCase().split(" ").includes(args[0].toLowerCase()))
          return message.channel.send(`**🚫 |** Filter này không tồn tại!`)
      client.distube.setFilter(message, args[0]);

      message.channel.send(new MessageEmbed()
        .setColor(ee.color)
        .setFooter(ee.footertext,ee.footericon)
        .setTitle(`**✅ |** Đã cài filter thành: \`${args[0]}\``)
      )
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