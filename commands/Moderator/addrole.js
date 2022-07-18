const Discord = require('discord.js')
const db = require('quick.db')
const ee = require('../../config/embed.json')
module.exports = {
    name: 'addrole',
    category: 'Moderator',
    aliases: ['addrole', 'giverole', 'roleadd'],
    cooldown: 2,
    usaege: ['addrole <thành viên> <vai trò>'],
    description: 'Thêm vai trò cho thành viên cụ thể',
    run: (client, message, args) => {
        try {
            const { guild } = message
            const langDB = db.get(`lang_${guild.id}`)
            let vietnamese
            if (langDB) vietnamese = true
            if (!langDB) vietnamese = false
            if (!message.member.hasPermission('MANAGE_ROLES' || 'ADMINISTRATOR' || 'MANAGE_GUILD')) {
                message.reply(`${vietnamese ? `**🚫 |** Bạn không có quyền để dùng lệnh này!` : `**🚫 |** You do not have permission to use this command!`}`)
                return
            }
            const Member = message.mentions.members.first()
            const Role = message.mentions.roles.first()
            if (!Member) {
                message.reply(`${vietnamese ? `**🚫 |** Hãy mention ai đó!` : `**🚫 |** Please mention someone!`}`)
                return
            }
            if (!Role) {
                message.reply(`${vietnamese ? `**🚫 |** Hãy mention vai trò cần add!` : `**🚫 |** Please mention a role!`}`)
                return
            }
            if (Member.roles.highest.position > message.guild.members.resolve(client.user).roles.highest.position) {
                message.channel.send(`${vietnamese ? `**❌ |** Không thể addrole ${Member} vì role tích hợp của bot quá thấp! g-help để xem cách khắc phục` : `**❌ |** Can't add role for ${Member} because the built-in role of the bot is too low! g-help to get the help`}`)
                return
            }
            Member.roles.add(Role)
            message.channel.send(`${vietnamese ? `**✅ |** Đã thêm vai trò ${Role} cho ${Member}` : `**✅ |** Added ${Member} role ${Role}`}`)
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