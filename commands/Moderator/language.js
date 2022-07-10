const Discord = require('discord.js')
const ee = require('../../config/embed.json')
const db = require('quick.db')
module.exports = {
    name: 'language',
    category: 'Moderator',
    aliases: ['language', 'lang'],
    cooldown: 2,
    usaege: ['language <vietnamese/english>'],
    description: 'Thay đổi ngôn ngữ',
    run: async(client, message, args) => {
        try {
            if (!message.member.hasPermission('ADMINISTRATOR' || 'MANAGE_GUILD')) {
                await message.reply('**🚫 |** Bạn không có quyền để dùng lệnh này!')
                return
            }
            const { guild } = message
            const input = args[0]
            if (!input) {
                await message.reply('Missing Input')
                return
            } else if (input === 'vietnamese') {
                db.set(`lang_${guild.id}`, true)
            } else if (input === 'english') {
                db.set(`lang_${guild.id}`, false)
            }
            const langDB = await db.get(`lang_${guild.id}`)
            let vietnamese
            if (langDB) vietnamese = true
            if (!langDB) vietnamese = false

            await message.channel.send(`${vietnamese ? '**:flag_vn: |** Đã chuyển ngôn ngữ thành Tiếng Việt' : '**:flag_gb: |** Language changed to English'}`)
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