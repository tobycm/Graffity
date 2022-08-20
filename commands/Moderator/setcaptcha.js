const Discord = require('discord.js')
const ee = require('../../config/embed.json')
const { ownerid } = require("../../config/config.json")
const db = require('quick.db')
module.exports = {
    name: 'setcaptcha',
    category: 'Moderator',
    aliases: ['setcaptcha', 'setverify'],
    cooldown: 3,
    useage: 'setcaptcha <kênh> <vai trò> <nội dung>',
    description: 'Tạo tin nhắn xác nhận bằng captcha',
    run: async (client, message, args, member) => {
        try {
            const { guild } = message
            const langDB = db.get(`lang_${guild.id}`)
            let vietnamese
            if (langDB) vietnamese = true
            if (!langDB) vietnamese = false
            let Userid = message.author.id
            const owner = db.fetch(`access_${guild.id}`)
            if (Userid !== ownerid || Userid !== owner) {
                await message.reply(`${vietnamese ? `**\`🔒\` |** Bạn không phải owner của bot!` : `**\`🔒\` |** You're not owner of bot!`}`)
                return
            }
            if (!message.member.permissions.has('MANAGE_ROLES' || 'ADMINISTRATOR' || 'MANAGE_GUILD')) {
                await message.reply(`${vietnamese ? `**<:cyber_failed:1002595191082983464> |** Bạn không có quyền để dùng lệnh này!` : `**<:cyber_failed:1002595191082983464> |** You do not have permission to use this command!`}`)
                return
            }

            const ch = message.mentions.channels.first()
            const r = message.mentions.roles.first()
            if (!ch) return message.reply(`${vietnamese ? `**<:cyber_failed:1002595191082983464> |** Hãy mentions một kênh bất kì!!` : `**<:cyber_failed:1002595191082983464> |** Please mentions a channel!`}`)
            if (!r) return message.reply(`${vietnamese ? `**<:cyber_failed:1002595191082983464> |** Hãy mentions một vai trò! ( dành cho thành viên )` : `**<:cyber_failed:1002595191082983464> |** Please mentions a role! ( for member )`}`)

            const Embed = new Discord.MessageEmbed()
            .setTitle(`${vietnamese ? `<:verifycation:995576719870263338> Xác minh captcha` : `<:verifycation:995576719870263338> Captcha verify`}`)
            .setDescription(`${vietnamese ? `Nhập \`g-captcha\` để xác minh! chúng tôi sẽ cập nhật xác minh với nút sau!` : `Type \`g-captcha\` to verify! we will update button soon!`}`)
            .setColor(ee.color)
            .setFooter(ee.footertext, ee.footericon)

            const Bt = new Discord.MessageButton()
            .setStyle('SUCCESS')
            .setLabel(`${vietnamese ? `Xác minh bằng nút comming soon!` : `Verify with button comming soon!`}`)
            .setCustomId('-captcha')
            .setDisabled(true)

            const row = new Discord.MessageActionRow()
            .addComponents(Bt)

            db.set(`verify_channel_${message.guild.id}`, ch.id)
            db.set(`verify_role_${message.guild.id}`, r.id)

            ch.send({ embeds: [Embed], components: [row]})
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