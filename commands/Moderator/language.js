const Discord = require('discord.js')
const ee = require('../../config/embed.json')
const db = require('quick.db')
module.exports = {
    name: 'language',
    category: 'Moderator',
    aliases: ['language', 'lang'],
    cooldown: 2,
    useage: ['language <vietnamese/english>'],
    description: 'Thay đổi ngôn ngữ',
    run: async(client, message, args) => {
        try {
            const { guild } = message
            const langDB = await db.get(`lang_${guild.id}`)
            let vietnamese
            if (langDB) vietnamese = true
            if (!langDB) vietnamese = false
            if (!message.member.permissions.has('ADMINISTRATOR' || 'MANAGE_GUILD')) {
                await message.reply(`${vietnamese ? `**<:cyber_failed:1002595191082983464> |** Bạn không có quyền để dùng lệnh này!` : `**<:cyber_failed:1002595191082983464> |** You do not have permission to use this command!`}`)
                return
            }
            
            let lang = ['vietnamese', 'english']
            var display
            const input = args[0]
            if (!input) {
                await message.reply('**<:cyber_failed:1002595191082983464> |** Hãy ghi ngôn ngữ! - Please enter the language!')
                return
            } else if (!lang.includes(input)) {
                await message.reply(`**<:cyber_failed:1002595191082983464> |** english/vietnamese !`)
                return
            } else if (input === 'vietnamese') {
                db.set(`lang_${guild.id}`, true)
                display = `**:flag_vn: |** Đã chuyển ngôn ngữ thành Tiếng Việt`
            } else if (input === 'english') {
                db.set(`lang_${guild.id}`, false)
                display = `**:flag_gb: |** Language changed to English`
            }

            await message.channel.send(`${display}`)
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