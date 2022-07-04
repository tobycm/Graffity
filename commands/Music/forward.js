const { MessageEmbed } = require("discord.js");
const config = require("../../config/config.json");
const ee = require("../../config/embed.json");
const { format } = require("../../handlers/functions")
module.exports = {
    name: "forward",
    category: "Music",
    aliases: ["fwd", 'forward'],
    cooldown: 4,
    useage: "forward <giây>",
    description: "Tua đi một khoảng thời gian nhất định",
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
          .setTitle(`**🚫 |** Xin hãy ghi số giây mà bạn muốn tua đi!`)
          .setDescription(`Usage: \`${prefix}forward <số giây>\``)
        )

      let queue = client.distube.getQueue(message);
      let seektime = queue.currentTime + Number(args[0]) * 1000;
      if(seektime < 0)
        seektime = queue.songs[0].duration * 1000;
      if(seektime >= queue.songs[0].duration * 1000)
        seektime = queue.songs[0].duration * 1000 - 1000;

      client.distube.seek(message, seektime);

      message.channel.send(`**⏩ |** Đã tua **${args[0]} giây** đến: **${format(seektime)}**`)
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
