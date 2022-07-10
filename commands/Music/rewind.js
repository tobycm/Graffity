const { MessageEmbed } = require("discord.js");
const db = require('quick.db')
const ee = require("../../config/embed.json");
const { format } = require("../../handlers/functions")
module.exports = {
    name: "rewind",
    category: "Music",
    aliases: ["rew", 'rewind'],
    cooldown: 4,
    useage: "rewind <giây>",
    description: "Tua lại bài hát một khoảng thời gian nhất định",
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
      if(!args[0])
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`${vietnamese ? `**🚫 |** Xin hãy ghi số giây mà bạn muốn tua ngược lại!` : `**🚫 |** Please enter the number of seconds you want to rewind!`}`)
          .setDescription(`${vietnamese ? `Usage: \`${prefix}rewind <số giây>\`` : `Usage: \`${prefix}rewind <seconds>\``}`)
        )

      let queue = client.distube.getQueue(message);
      let seektime = queue.currentTime - Number(args[0]) * 1000;
      if(seektime < 0)
        seektime = 0;
      if(seektime >= queue.songs[0].duration * 1000 - queue.currentTime)
        seektime = 0;

      client.distube.seek(message, seektime);

      message.channel.send(`${vietnamese ? `**⏪ |** Đã tua ngược **${args[0]} giây** đến: **${format(seektime)}**` : `**⏪ |** Rewinded **${args[0]} seconds** to: **${format(seektime)}**`}`)
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