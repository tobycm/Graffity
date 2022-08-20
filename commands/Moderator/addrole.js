const Discord = require('discord.js')
const db = require('quick.db')
const ee = require('../../config/embed.json')
module.exports = {
    name: 'addrole',
    category: 'Moderator',
    aliases: ['addrole', 'giverole', 'roleadd'],
    cooldown: 2,
    useage: ['addrole <thành viên> <vai trò>'],
    description: 'Thêm vai trò cho thành viên cụ thể',
    run: (client, message, args) => {
        try {
            const { guild } = message
            const langDB = db.get(`lang_${guild.id}`)
            let vietnamese
            if (langDB) vietnamese = true
            if (!langDB) vietnamese = false
            if (!message.member.permissions.has('MANAGE_ROLES' || 'ADMINISTRATOR' || 'MANAGE_GUILD')) {
                message.reply(`${vietnamese ? `**<:cyber_failed:1002595191082983464> |** Bạn không có quyền để dùng lệnh này!` : `**<:cyber_failed:1002595191082983464> |** You do not have permission to use this command!`}`)
                return
            }
            const Member = message.mentions.members.first()
            const Role = message.mentions.roles.first()
            if (!Member) {
                message.reply(`${vietnamese ? `**<:cyber_failed:1002595191082983464> |** Hãy mention ai đó!` : `**<:cyber_failed:1002595191082983464> |** Please mention someone!`}`)
                return
            }
            if (!Role) {
                message.reply(`${vietnamese ? `**<:cyber_failed:1002595191082983464> |** Hãy mention vai trò cần add!` : `**<:cyber_failed:1002595191082983464> |** Please mention a role!`}`)
                return
            }
            if (Member.roles.highest.position > message.guild.members.resolve(client.user).roles.highest.position) {
                message.channel.send(`${vietnamese ? `**<:cyber_failed:1002595191082983464> |** Không thể addrole ${Member} vì role tích hợp của bot quá thấp! g-help để xem cách khắc phục` : `**<:cyber_failed:1002595191082983464> |** Can't add role for ${Member} because the built-in role of the bot is too low! g-help to get the help`}`)
                return
            }
            Member.roles.add(Role)
            message.channel.send(`${vietnamese ? `**<:cyber_success:1002595116164317204> |** Đã thêm vai trò ${Role} cho ${Member}` : `**<:cyber_success:1002595116164317204> |** Added ${Member} role ${Role}`}`)
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