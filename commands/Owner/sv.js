const { MessageEmbed } = require('discord.js')
const ee = require('../../config/embed.json')
const { ownerid } = require("../../config/config.json")
const db = require('quick.db')
module.exports = {
    name: 'sv',
    category: 'Owner',
    aliases: ['sv'],
    cooldown: 2,
    useage: 'None',
    description: 'None',
    run: async (client, message, args, member) => {
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
                const sv = client.guilds.cache
                .sort((a, b) => b.memberCount - a.memberCount)
                .map(r => r)
                .map((r, i) => `**${i + 1}** - \`${r.name}\` | **__${r.memberCount}__** Members\nID - \`${r.id}\``)
                .slice(0, 80)
                .join("\n")
                
                message.react('✅')
                await member.send(`${sv}\n`)   
            }
        } catch (e) {
            console.log(String(e.stack).bgRed)
            const Err = new MessageEmbed()
            .setColor(`${ee.wrongcolor}`)
            .setFooter(`${ee.footertext}`, `${ee.footericon}`)
            .setTitle(`**<:warning:1001866544797716511> |** Ôi hỏng rồi | đã xảy ra lỗi!`)
            .setDescription(`\`\`\`${e.stack}\`\`\``)
            
            await message.channel.send({embeds:[Err]})
            return
        }
    }
}