const { MessageEmbed } = require("discord.js");
const db = require('quick.db')
const ee = require("../../config/embed.json");
const filters = [
  "clear",
  "bassboost",
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
      if(!client.distube.getQueue(message))
      return message.channel.send(new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`${vietnamese ? `**🚫 |** Queue trống!` : `**🚫 |** Queue is empty!`}`)
      )
      if(client.distube.getQueue(message) && channel.id !== message.guild.me.voice.channel.id) {
          message.channel.send(`${vietnamese ? `**🚫 |** Xin hãy vào kênh thoại **của tôi** trước đã!` : `**🚫 |** Please join **my voice** first!`}`)
          return
      }
      const Input = args[0]
      if (!filters.includes(Input)) return message.reply(`${vietnamese ? `**🚫 |** Filter này không tồn tại!` : `**🚫 |** Please enter valid filter name!`}`)
      if(!Input)
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`${vietnamese ? `**🚫 |** Xin hãy ghi tên filter` : `**🚫 |** Please enter filter name`}`)
          .setImage('https://media.discordapp.net/attachments/965155548611899422/997489122711191643/unknown.png')
        )

      client.distube.setFilter(message, Input);

      message.channel.send(new MessageEmbed()
        .setColor(ee.color)
        .setFooter(ee.footertext,ee.footericon)
        .setTitle(`${vietnamese ? `**✅ |** Đã cài filter thành: \`${Input}\`` : `**✅ |** Set filter to: \`${Input}\``}`)
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