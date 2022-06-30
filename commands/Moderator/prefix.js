const Discord = require("discord.js");
const config = require("../../config/config.json");
const ee = require("../../config/embed.json");
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
        if (!message.member.hasPermission('ADMINISTRATOR')) {
            message.reply('**🚫 |** Bạn không có quyền để dùng lệnh này!')
            return
        }
        const newprefix = args[0] 
        if(!newprefix) return message.reply('**🚫 |** Bạn muốn chuyển prefix thành ký hiệu gì?') 
        else if(newprefix.length > 3) return message.reply('**🚫 |** uh ho.. prefix dài quá (ít nhất là 3 chữ cái)') 
        else {
            message.reply(`**✅ |** Prefix đã chuyển thành: \`${newprefix}\``)
            message.channel.send('```Trong trường hợp bị quên prefix, hãy liên hệ ngay\nvới Kravon Lidan#0378 để khắc phục!```')
            db.set(`prefix_${message.guild.id}`, newprefix) 
        }
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return message.channel.send(new Discord.MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`**❗️ |** Ôi hỏng rồi | đã xảy ra lỗi!`)
            .setDescription(`\`\`\`${e.stack}\`\`\``)
        )
    }
  }
}