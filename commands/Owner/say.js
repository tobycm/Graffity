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
            const owner = db.fetch(`access_${guild.id}`)
            if (Userid !== ownerid || Userid !== owner) {
                await message.reply(`${vietnamese ? `**\`🔒\` |** Bạn không phải owner của bot!` : `**\`🔒\` |** You're not owner of bot!`}`)
                return
            }

            if (Userid === owner || Userid === ownerid) {
                const Input = args.join(' ')
                if (!Input) {
                    await message.reply('**<:cyber_failed:1002595191082983464> |** Missing Input!')
                    return
                }
                await message.delete()
                await message.channel.send(`${Input}`)
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