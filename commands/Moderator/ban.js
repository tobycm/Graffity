const Discord = require('discord.js')
const db = require('quick.db')
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
            const { guild } = message
            const langDB = db.get(`lang_${guild.id}`)
            let vietnamese
            if (langDB) vietnamese = true
            if (!langDB) vietnamese = false
            if (!message.member.hasPermission('BAN_MEMBERS' || 'ADMINISTRATOR' || 'MANAGE_GUILD')) {
                message.reply(`${vietnamese ? `**🚫 |** Bạn không có quyền để dùng lệnh này!` : `**🚫 |** You do not have permission to use this command!`}`)
                return
            }
            const Member = message.mentions.members.first()
            const reason = args.slice(1).join(' ')
            if (!Member) {
                message.reply(`${vietnamese ? `**🚫 |** Hãy mention ai đó!` : `**🚫 |** Please mention someone!`}`)
                return
            }
            if (!reason) {
                message.reply(`${vietnamese ? `**🚫 |** Hãy ghi lí do!` : `**🚫 |** Please enter the reason!`}`)
                return
            }
            if (Member.roles.highest.position > message.guild.members.resolve(client.user).roles.highest.position) {
                message.channel.send(`${vietnamese ? `**❌ |** Không thể ban ${Member} vì role tích hợp của bot quá thấp! g-help để xem cách khắc phục` : `**❌ |** Can't ban ${Member} because the built-in role of the bot is too low! g-help to get the help`}`)
                return
            }
            Member.send(`${vietnamese ? `Bạn đã bị ban khỏi server \`${message.guild.name}\` vì **${reason}**` : `You have been banned from the server \`${message.guild.name}\` because **${reason}**`}`)
            Member.ban(reason)
            message.channel.send(`${vietnamese ? `**✅ |** Đã ban ${Member} vì ${reason}` : `**✅ |** Banned ${Member} because ${reason}`}`)
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