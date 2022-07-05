const Discord = require('discord.js')
const config = require('../../config/config.json')
const ee = require('../../config/embed.json')
module.exports = {
    name: 'warn',
    category: 'Moderator',
    aliases: ['warn'],
    cooldown: 2,
    usaege: 'warn <member> <lí do>',
    description: 'warn một người dùng',
    run: async(message, args, client) => {
        try {
            if (!message.member.hasPermission('KICK_MEMBERS' || 'BAN_MEMBERS' || 'ADMINISTRATOR' || 'MANAGE_GUILD')) {
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
                message.channel.send(`**❌ |** Không thể warn ${Member} vì role tích hợp của bot quá thấp! g-help để xem cách khắc phục`)
                return
            }
            Member.send(`Bạn đã bị warn ở server \`${message.guild.name}\` vì **${reason}**`)
            message.channel.send(`**✅ |** Đã warn ${Member} vì ${reason}`)
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