const Discord = require('discord.js')
const db = require('quick.db')
const ee = require('../../config/embed.json')

module.exports = {
    name: 'setwarn',
    category: 'Moderator',
    aliases: ['setwarn'],
    cooldown: 2,
    usaege: 'setwarn <số lần bị warn> <hình phạt>',
    description: 'setwarn để bonk ai đó',
    run: (client, message, args) => {
        try {
            if (!message.member.hasPermission('ADMINISTRATOR' || 'MANAGE_GUILD')) {
                message.reply('**🚫 |** Bạn không có quyền để dùng lệnh này!')
                return
            }
            const Auth = message.member
            const Server = message.guild
            const count = args[0]
            const det = args[1]
            if (!count) {
                message.reply('**🚫 |** Hãy ghi số lần giới hạn warn!')
                return
            }
            if (count > 10) {
                message.reply('**🚫 |** Giới hạn 10 lần warn!')
                return
            }
            if (count < 1) {
                message.reply('**🚫 |** Ít nhất phải trên 1 lần warn!')
                return
            }
            if (!det) {
                message.reply('**🚫 |** Hãy ghi hình phạt!')
                return
            }
            if (det !== 'kick') {
                message.reply('**🚫 |** Chỉ có thể chọn hình phạt là \`kick\`!')
                return
            }
            if (det === 'kick') {
                db.set(`det_${Server.id}`, 'kick')
                return
            }
            if (det === 'ban') {
                db.set(`det_${Server.id}`, 'ban')
                return
            }
            db.set(`count_${Server.id}`, count)
            message.channel.send(`**✅ |** Đã set thành công!\ncount: \`${count}\`\nhình phạt: \`${det}\``)
            console.log(count, det)
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