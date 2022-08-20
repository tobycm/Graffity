const Discord = require("discord.js")
const config = require("../../config/config.json")
const ee = require("../../config/embed.json")
const db = require('quick.db')
module.exports = {
    name: "prefix",
    category: "Moderator",
    aliases: ["prefix", 'setprefix'],
    cooldown: 2,
    useage: "prefix <prefix mới>",
    description: "Đổi prefix của bot",
    run: async (client, message, args, user, text, prefix) => {
    try{
        const { guild } = message
        const langDB = db.get(`lang_${guild.id}`)
        let vietnamese
        if (langDB) vietnamese = true
        if (!langDB) vietnamese = false
        if (!message.member.permissions.has('ADMINISTRATOR')) {
            message.reply(`${vietnamese ? `**<:cyber_failed:1002595191082983464> |** Bạn không có quyền để dùng lệnh này!` : `**<:cyber_failed:1002595191082983464> |** You do not have permission to use this command!`}`)
            return
        }
        const newprefix = args[0] 
        if(!newprefix) return message.reply(`${vietnamese ? `**<:cyber_failed:1002595191082983464> |** Bạn muốn chuyển prefix thành ký hiệu gì?` : `**<:cyber_failed:1002595191082983464> |** What symbol do you want to convert the prefix to?`}`) 
        else if(newprefix.length > 3) return message.reply('**<:cyber_failed:1002595191082983464> |** uh ho.. prefix dài quá (ít nhất là 3 chữ cái)') 
        else {
            message.reply(`${vietnamese ? `**<:cyber_success:1002595116164317204> |** Prefix đã chuyển thành: \`${newprefix}\`` : `**<:cyber_success:1002595116164317204> |** Prefix changed to: \`${newprefix}\``}`)
            message.channel.send(`${vietnamese ? `\`\`\`Trong trường hợp bị quên prefix, hãy liên hệ ngay\nvới Kravon Lidan#0378 để khắc phục!\`\`\`` : `\`\`\`If you forgot the prefix, please contact\nwith Kravon Lidan#0378 to fix!\`\`\``}`)
            db.set(`prefix_${message.guild.id}`, newprefix) 
        }
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