const { MessageEmbed } = require("discord.js");
const config = require("../../../config/config.json");
const ee = require("../../../config/embed.json");
module.exports = {
    name: "loop",
    category: "Music",
    aliases: ["repeat", 'loop'],
    cooldown: 4,
    useage: "loop <0/1/2>",
    description: "Lặp lại bài hát/queue",
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
          .setTitle(`**🚫 |** Bạn chưa bật chế độ lặp`)
          .setDescription(`Usage: \`${prefix}loop <0/1/2>\n0 = tắt\n1 = nhạc hiện tại\n2 = queue\``)
        );
      let loopstate = args[0].toString();
      if (loopstate.toLowerCase() === "off") loopstate = "0"
      if (loopstate.toLowerCase() === "song") loopstate = "1"
      if (loopstate.toLowerCase() === "queue") loopstate = "2"
      
      loopstate = Number(loopstate);
      loopstates = {
        "0": "off",
        "1" : "song",
        "2": "queue"
      }
      if( 0 <= loopstate && loopstate <= 2){
        client.distube.setRepeatMode(message, parseInt(loopstate));
        message.channel.send(`**🔁 |** Chế độ lặp lại được chuyển thành: \`${loopstates[loopstate]}\``)
      }
      else{
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`**🚫 |** Bạn chưa bật chế độ lặp`)
          .setDescription(`Usage: \`${prefix}loop <0/1/2>\n0 = tắt\n1 = nhạc hiện tại\n2 = queue\``)
        );
      }


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