const { MessageEmbed, User } = require("discord.js")
const { ownerid } = require("../../config/config.json")
const ee = require("../../config/embed.json")
const db = require('quick.db')
module.exports = {
    name: "say",
    category: "Owner",
    aliases: ['say', 's'],
    cooldown: 1,
    useage: "None",
    description: "None",
    run: async (client, message, args, cmduser, text, prefix) => {
        try {
            const { guild } = message
            const langDB = db.get(`lang_${guild.id}`)
            let vietnamese
            if (langDB) vietnamese = true
            if (!langDB) vietnamese = false

            let Userid = message.author.id
            const Auth = message.member

            if (Userid !== ownerid) {
                await message.reply(`${vietnamese ? `**\`🔒\` |** Bạn không phải owner của bot!` : `**\`🔒\` |** You're not owner of bot!`}`)
                return
            }

            if (Userid === ownerid) {
                const Input = args.slice(1).join(' ')
                const Channel = message.mentions.channels.first()
                if (!Input) {
                    await message.reply('**<:cyber_failed:1002595191082983464> |** Missing Input!')
                    return
                }
                if (!Channel) {
                    await message.reply('**<:cyber_failed:1002595191082983464> |** Missing Channel!')
                    return
                }
                await message.delete()
                await Channel.send(`${Input}`)
            }
        } catch (e) {
            console.log(String(e.stack).bgRed)
            return message.channel.send(new MessageEmbed()
                .setColor(ee.wrongcolor)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(`**<:warning:1001866544797716511> |** Ôi hỏng rồi | đã xảy ra lỗi!`)
                .setDescription(`\`\`\`${e.stack}\`\`\``)
            )
        }
    }
}