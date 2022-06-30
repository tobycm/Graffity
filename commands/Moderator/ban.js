const Discord = require('discord.js')
const ee = require('../../config/embed.json')
module.exports = {
    name: 'ban',
    category: 'Moderator',
    aliases: ['ban'],
    cooldown: 2,
    usaege: ['ban <thành viên> <lí do>'],
    description: 'Ban ai đó',
    run: (client, message, args) => {
        try {
            if (!message.member.hasPermission('BAN_MEMBERS' || 'ADMINISTRATOR' || 'MANAGE_GUILD')) {
                message.reply('**🚫 |** Bạn không có quyền để dùng lệnh này!')
                return
            }
            const Member = message.mentions.members.first()
            const reason = args.slice(1).join(' ')
            if (!Member) {
                message.reply('**🚫 |** Hãy mention ai đó!')
                return
            }
            if (!reason) {
                message.reply('**🚫 |** Hãy ghi lí do!')
                return
            }
            if (Member.roles.highest.position > message.guild.members.resolve(client.user).roles.highest.position) {
                message.channel.send(`**❌ |** Không thể ban ${Member} vì role tích hợp của bot quá thấp! g-help để xem cách khắc phục`)
                return
            }
            Member.send(`Bạn đã bị ban khỏi server \`${message.guild.name}\` vì **${reason}**`)
            Member.ban(reason)
            message.channel.send(`**✅ |** Đã ban ${Member} vì ${reason}`)
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