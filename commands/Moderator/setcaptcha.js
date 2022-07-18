const Discord = require('discord.js')
const ee = require('../../config/embed.json')
const db = require('quick.db')
const { MessageButton } = require('discord-buttons')
module.exports = {
    name: 'setcaptcha',
    category: ['Moderator'],
    aliases: ['setcaptcha', 'setverify'],
    cooldown: 3,
    usaege: 'setcaptcha <kênh> <vai trò> <nội dung>',
    description: 'Tạo tin nhắn xác nhận bằng captcha',
    run: async (client, message, args, member) => {
        try {
            const { guild } = message
            const langDB = db.get(`lang_${guild.id}`)
            let vietnamese
            if (langDB) vietnamese = true
            if (!langDB) vietnamese = false
            if (!message.member.hasPermission('MANAGE_ROLES' || 'ADMINISTRATOR' || 'MANAGE_GUILD')) {
                await message.reply(`${vietnamese ? `**🚫 |** Bạn không có quyền để dùng lệnh này!` : `**🚫 |** You do not have permission to use this command!`}`)
                return
            }

            const ch = message.mentions.channels.first()
            const r = message.mentions.roles.first()
            if (!ch) return message.reply(`${vietnamese ? `**🚫 |** Hãy mentions một kênh bất kì!!` : `**🚫 |** Please mentions a channel!`}`)
            if (!r) return message.reply(`${vietnamese ? `**🚫 |** Hãy mentions một vai trò! ( dành cho thành viên )` : `**🚫 |** Please mentions a role! ( for member )`}`)

            const Embed = new Discord.MessageEmbed()
            .setTitle(`${vietnamese ? `<:verifycation:995576719870263338> Xác minh captcha` : `<:verifycation:995576719870263338> Captcha verify`}`)
            .setDescription(`${vietnamese ? `Nhập \`g-captcha\` để xác minh! chúng tôi sẽ cập nhật xác minh với nút sau!` : `Type \`g-captcha\` to verify! we will update button soon!`}`)
            .setColor(ee.color)
            .setFooter(ee.footertext, ee.footericon)

            const Bt = new MessageButton()
            .setStyle('green')
            .setLabel(`${vietnamese ? `Xác minh bằng nút comming soon!` : `Verify with button comming soon!`}`)
            .setID('-captcha')
            .setDisabled()

            db.set(`verify_channel_${message.guild.id}`, ch.id)
            db.set(`verify_role_${message.guild.id}`, r.id)

            ch.send({
                button: Bt,
                embed: Embed
            })
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