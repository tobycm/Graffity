const { MessageEmbed } = require("discord.js");
const db = require('quick.db')
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
      const { guild } = message
      const langDB = db.get(`lang_${guild.id}`)
      let vietnamese
      if (langDB) vietnamese = true
      if (!langDB) vietnamese = false
      const Desc = args.join(' ')
      const Channel = client.channels.cache.get('994245076316327966')
      if (!Desc) {
        message.reply(`${vietnamese ? `**🚫 |** Xin hãy ghi nội dung lỗi kèm link ảnh chụp phần báo lỗi!` : `**🚫 |** Please write the error message with the image link of the error report!`}`)
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