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
    run: async (client, message, args) => {
        try {
            let Userid = message.author.id
            if (Userid !== ownerid) {
                await message.reply('**🚫 |** Bạn không phải owner của bot!')
                return
            }
            const sv = client.guilds
            await message.channel.send(new MessageEmbed()
            .setDescription(`${sv}`)
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
