const { MessageEmbed } = require("discord.js");
const config = require("../../config/config.json");
const ee = require("../../config/embed.json");
module.exports = {
    name: "play",
    category: "Music",
    aliases: ["p", "play"],
    cooldown: 4,
    useage: "play <URL / TITLE>",
    description: "PLays a song from youtube",
    run: async (client, message, args) => {
    try{
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