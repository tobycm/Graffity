const { MessageEmbed } = require('discord.js')
const ee = require('../../config/embed.json')
const { ownerid } = require("../../config/config.json")
module.exports = {
    name: 'sv',
    category: 'Owner',
    aliases: ['sv'],
    cooldown: 2,
    usaege: 'None',
    description: 'None',
    run: async (client, message, member, args) => {
        try {
            let Userid = message.author.id
            if (Userid !== ownerid) {
                await message.reply('**🚫 |** Bạn không phải owner của bot!')
                return
            }
            const sv = client.guilds.cache
            .sort((a, b) => b.memberCount - a.memberCount)
            .map(r => r)
            .map((r, i) => `**${i + 1}** - \`${r.name}\` | **__${r.memberCount}__** Members\nID - \`${r.id}\``)
            .slice(0, 40)
            .join("\n")

            await member.send(new MessageEmbed()
            .setDescription(`${sv}\n`)
            )
        } catch (e) {
            console.log(String(e.stack).bgRed)
            return await message.channel.send(new MessageEmbed()
            .setColor(`${ee.wrongcolor}`)
            .setFooter(`${ee.footertext}`, `${ee.footericon}`)
            .setTitle(`**❗️ |** Ôi hỏng rồi | đã xảy ra lỗi!`)
            .setDescription(`\`\`\`${e.stack}\`\`\``)
            )
        }
    }
}
