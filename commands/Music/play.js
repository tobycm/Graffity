const { MessageEmbed } = require("discord.js");
const ee = require("../../config/embed.json");
module.exports = {
    name: "play",
    category: "Music",
    aliases: ["p", "play"],
    cooldown: 4,
    useage: "play <Link/tên nhạc>",
    description: "Phát một bản nhạc từ youtube",
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
      const search = args.join(' ')
      if(!search)
        return message.channel.send('**🚫 |** Xin hãy ghi tên/link bài hát!')
      message.channel.send(new MessageEmbed()
        .setColor(ee.color)
        .setFooter(ee.footertext,ee.footericon)
        .setTitle("Đang tìm nhạc..")
        .setDescription(`\`\`\`fix\n${search}\n\`\`\``)
      );
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