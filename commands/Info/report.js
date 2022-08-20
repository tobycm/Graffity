const { MessageEmbed } = require("discord.js")
const db = require('quick.db')
const ee = require("../../config/embed.json")
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
      const Channel = client.channels.cache.get('1000045555449335889')
      if (!Desc) {
        message.reply(`${vietnamese ? `**<:cyber_failed:1002595191082983464> |** Xin hãy ghi nội dung lỗi kèm link ảnh chụp phần báo lỗi!` : `**<:cyber_failed:1002595191082983464> |** Please write the error message with the image link of the error report!`}`)
        return
      }
      Channel.send(`\`\`\`fix\nBáo lỗi từ ${message.member.user.tag}\nDesc: ${Desc}\`\`\`\n<@867741983774212166> Bắt bọ time`)
      message.react('<:cyber_success:1002595116164317204>')
    } catch (e) {
        console.log(String(e.stack).bgRed)
        const Err = new Discord.MessageEmbed()
.setColor(ee.wrongcolor)
.setFooter(ee.footertext, ee.footericon)
.setTitle(`**<:warning:1001866544797716511> |** Ôi hỏng rồi | đã xảy ra lỗi!`)
.setDescription(`\`\`\`${e.stack}\`\`\``)
return message.channel.send({embeds:[Err]})
    }
  }
}