const { MessageEmbed } = require("discord.js");
const config = require("../../config/config.json");
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
          .setTitle(`**🚫 |** Xin hãy ghi số giây mà bạn muốn tua lại!`)
          .setDescription(`Usage: \`${prefix}rewind <số giây>\``)
        )

      let queue = client.distube.getQueue(message);
      let seektime = queue.currentTime - Number(args[0]) * 1000;
      if(seektime < 0)
        seektime = 0;
      if(seektime >= queue.songs[0].duration * 1000 - queue.currentTime)
        seektime = 0;

      client.distube.seek(message, seektime);

      message.channel.send(`**⏪ |** Đã tua ngược **${args[0]} giây** đến: **${format(seektime)}**`).then(msg=>msg.delete({timeout: 4000}).catch(e=>console.log(e.message)))
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