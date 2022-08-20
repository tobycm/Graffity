const Discord = require('discord.js')
const db = require('quick.db')
const ee = require('../../config/embed.json')
module.exports = {
    name: 'backroom',
    category: ['Game'],
    aliases: ['backroom', 'br'],
    cooldown: 2,
    useage: 'backroom <độ khó> <level>',
    description: 'Break the reallity',
    run: async (client, message, args, member) => {
        try {
            const { guild } = message
            const langDB = db.get(`lang_${guild.id}`)
            let vietnamese
            if (langDB) vietnamese = true
            if (!langDB) vietnamese = false

            const { ownerid } = require('../../config/config.json')
            let Userid = message.author.id
            if (Userid !== ownerid) {
                await message.reply(`${vietnamese ? `**\`🔒\` |** Bạn không phải owner của bot!` : `**\`🔒\` |** You're not owner of bot!`}`)
                return
            }
            const dif = args[0]
            const level = args[1]
            const health = 100
            const mind = `${vietnamese ? `Ổn` : `Normal`}`
            const pandemic = 'none'
            const sanity = 80
            let d1 = ['easy', 'medium', 'hard', 'chaos']
            let l1 = ['0', '1']
            if (!dif) return message.reply(`${vietnamese ? `**<:cyber_failed:1002595191082983464> |** Xin hãy ghi độ khó! \`easy/medium/hard/chaos\`` : `**<:cyber_failed:1002595191082983464> |** Please enter the difficulty! \`easy/medium/hard/chaos\``}`)
            if (!level) return message.reply(`${vietnamese ? `**<:cyber_failed:1002595191082983464> |** Xin hãy ghi level! \`0/1\`` : `**<:cyber_failed:1002595191082983464> |** Please enter the level! \`0/1\``}`)

            if (!d1.includes(dif)) return message.reply(`${vietnamese ? `**<:cyber_failed:1002595191082983464> |** Chỉ có thể chọn \`easy/medium/hard/chaos\`!` : `**<:cyber_failed:1002595191082983464> |** \`easy/medium/hard/chaos\` only!`}`)
            if (!l1.includes(level)) return message.reply(`${vietnamese ? `**<:cyber_failed:1002595191082983464> |** Chỉ có thể chọn \`0/1\`!` : `**<:cyber_failed:1002595191082983464> |** \`0/1\` only!`}`)

            const Embed1 = new Discord.MessageEmbed()
            .setColor('#303136')
            .setFooter('async company ~', ee.footericon)
            .setTitle(`${vietnamese ? `\`🚪\` ${message.member.user.tag} đã noclip đến backroom!` : `\`🚪\` ${message.member.user.tag} noclip to the backroom!`}`)
            .setDescription(`${vietnamese ? `Bạn đã bị no clip đến The Backroom!, nơi được cho là phá vỡ rào cản của thực tại, hãy cùng khám phá và tìm cách thoát khỏi đây nào!` : `You've been no clip to The Backroom!, which is said to break the barrier of reality, let's explore and find a way out of here!`}`)
            .addField(`${vietnamese ? `\`Độ khó\`` : `\`Difficulty\``}`, `**__${dif}__**`, true)
            .addField(`${vietnamese ? `\`Tầng\`` : `\`Level\``}`, `**__${level}__**`, true)
            .addField(`${vietnamese ? `\`Tỉnh táo\`` : `\`Sanity\``}`, `**__${sanity}%__**`, true)
            .addField(`${vietnamese ? `\`Sức khỏe\`` : `\`Health\``}`, `**__${health}%__**`, true)
            .addField(`${vietnamese ? `\`Tinh thần\`` : `\`Mind\``}`, `**__${mind}__**`, true)
            .addField(`${vietnamese ? `\`Dịch bệnh\`` : `\`Pandemic\``}`, `**__${pandemic}__**`, true)
            .setImage('https://i.rada.vn/data/image/2022/05/18/Escape-the-Backrooms-700.jpg')

            const Button1 = new Discord.MessageButton()
            .setCustomId('-next')
            .setLabel(`${vietnamese ? `Tiếp tục` : `Continue`}`)
            .setStyle('SUCCESS')

            const Button2 = new Discord.MessageButton()
            .setCustomId('-action')
            .setLabel(`${vietnamese ? `Hành động` : `Action`}`)
            .setStyle('PRIMARY')

            const Button3 = new Discord.MessageButton()
            .setCustomId('-cancel')
            .setLabel(`${vietnamese ? `Hủy bỏ` : `Cancel`}`)
            .setStyle('DANGER')

            const row = new Discord.MessageActionRow()
            .addComponents(Button1, Button2, Button3)

            let msg = await message.channel.send({ embeds: [Embed1], components: [row] })
            setTimeout(() => msg.delete(), 56000)
            setTimeout(() => message.channel.send(`**🕐 |** ${vietnamese ? `Bot đợi quá lâu, bạn đã mất lượt!` : `Bot waits too long, you lost your turn!`}`), 56000)
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