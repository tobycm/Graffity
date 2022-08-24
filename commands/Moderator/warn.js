const Discord = require('discord.js')
const db = require('quick.db')
const ee = require('../../config/embed.json')
module.exports = {
    name: 'warn',
    category: 'Moderator',
    aliases: ['warn'],
    cooldown: 2,
    useage: 'warn <member> <lí do>',
    description: 'warn một người dùng',
    run: async(message, args, client) => {
        try {
            const { guild } = message
            const langDB = db.get(`lang_${guild.id}`)
            let vietnamese
            if (langDB) vietnamese = true
            if (!langDB) vietnamese = false

            if (!message.member.permissions.has('KICK_MEMBERS' || 'BAN_MEMBERS' || 'ADMINISTRATOR' || 'MANAGE_GUILD')) {
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
                message.channel.send(`${vietnamese ? `**<:cyber_failed:1002595191082983464> |** Không thể warn ${Member} vì role tích hợp của bot quá thấp! g-help để xem cách khắc phục` : `**<:cyber_failed:1002595191082983464> |** Can't warn ${Member} because the built-in role of the bot is too low! g-help to get the help`}`)
                return
            }
            Member.send(`${vietnamese ? `Bạn đã bị warn từ server \`${message.guild.name}\` vì **${reason}**` : `You have been warned from the server \`${message.guild.name}\` because **${reason}**`}`)
            message.channel.send(`${vietnamese ? `**<:cyber_success:1002595116164317204> |** Đã warn ${Member} vì ${reason}` : `**<:cyber_success:1002595116164317204> |** Warned ${Member} because ${reason}`}`)
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