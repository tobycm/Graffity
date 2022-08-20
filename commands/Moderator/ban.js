const Discord = require('discord.js')
const db = require('quick.db')
const ee = require('../../config/embed.json')
module.exports = {
    name: 'ban',
    category: 'Moderator',
    aliases: ['ban'],
    cooldown: 2,
    useage: ['ban <thành viên> <lí do>'],
    description: 'Ban ai đó',
    run: async(client, message, args) => {
        try {
            const { guild } = message
            const langDB = db.get(`lang_${guild.id}`)
            let vietnamese
            if (langDB) vietnamese = true
            if (!langDB) vietnamese = false
            if (!message.member.permissions.has('BAN_MEMBERS' || 'ADMINISTRATOR' || 'MANAGE_GUILD')) {
                message.reply(`${vietnamese ? `**<:cyber_failed:1002595191082983464> |** Bạn không có quyền để dùng lệnh này!` : `**<:cyber_failed:1002595191082983464> |** You do not have permission to use this command!`}`)
                return
            }
            const Member = message.mentions.members.first()
            const reason = args.slice(1).join(' ')
            if (!Member) {
                message.reply(`${vietnamese ? `**<:cyber_failed:1002595191082983464> |** Hãy mention ai đó!` : `**<:cyber_failed:1002595191082983464> |** Please mention someone!`}`)
                return
            }
            if (!reason) {
                message.reply(`${vietnamese ? `**<:cyber_failed:1002595191082983464> |** Hãy ghi lí do!` : `**<:cyber_failed:1002595191082983464> |** Please enter the reason!`}`)
                return
            }
            if (Member.roles.highest.position > message.guild.members.resolve(client.user).roles.highest.position) {
                message.channel.send(`${vietnamese ? `**<:cyber_failed:1002595191082983464> |** Không thể ban ${Member} vì role tích hợp của bot quá thấp! g-help để xem cách khắc phục` : `**<:cyber_failed:1002595191082983464> |** Can't ban ${Member} because the built-in role of the bot is too low! g-help to get the help`}`)
                return
            }
            if (Member.user.bot === true) {
                Member.ban()
                message.channel.send(`${vietnamese ? `**<:cyber_success:1002595116164317204> |** Đã ban ${Member} vì ${reason}` : `**<:cyber_success:1002595116164317204> |** Banned ${Member} because ${reason}`}`)
                return
            } else {
                message.react('<:cyber_success:1002595116164317204>')
                message.channel.send(`${vietnamese ? `**<:cyber_success:1002595116164317204> |** Đã ban ${Member} vì ${reason}` : `**<:cyber_success:1002595116164317204> |** Banned ${Member} because ${reason}`}`)
                Member.ban()
                await Member.send(`${vietnamese ? `Bạn đã bị ban khỏi server \`${message.guild.name}\` vì **${reason}**` : `You have been banned from the server \`${message.guild.name}\` because **${reason}**`}`)
                return
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