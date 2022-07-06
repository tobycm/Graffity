const { MessageEmbed } = require("discord.js");
const config = require("../../config/config.json");
const ee = require("../../config/embed.json");
module.exports = {
    name: 'report',
    category: "Info",
    aliases: ["report"],
    cooldown: 2,
    useage: "report <nội dung lỗi kèm link ảnh chụp phần báo lỗi>",
    description: "Báo lỗi bot",
    run: async (client, message, args, user, text, prefix) => {
    try{
      const Desc = args.join(' ')
      const Channel = client.channels.cache.get('994245076316327966')
      if (!Desc) {
        message.reply('**🚫 |** Xin hãy ghi nội dung lỗi kèm link ảnh chụp phần báo lỗi!')
        return
      }
      Channel.send(`\`\`\`fix\nBáo lỗi từ ${message.member.user.tag}\nDesc: ${Desc}\`\`\`\n<@&994254342540501042> Bắt bọ time`)
      message.react('✅')
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