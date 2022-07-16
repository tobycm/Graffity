const { MessageEmbed } = require('discord.js')
const ee = require('../../config/embed.json')
const { ownerid } = require("../../config/config.json")
const db = require('quick.db')
module.exports = {
    name: 'add',
    category: 'Owner',
    aliases: ['add'],
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

            const Auth = message.mentions.members.first()
            const Input = args[1]
            if (!Auth) {
                await message.reply('**🚫 |** Missing Mention!')
                return
            }

            if (!Input) {
                await message.reply('**🚫 |** Missing Input!')
                return
            }
            if (Input === '1') db.set(`logo_1_${Auth.id}`, true)
            if (Input === '2') db.set(`logo_2_${Auth.id}`, true)
            if (Input === '3') db.set(`logo_3_${Auth.id}`, true)
            if (Input === '4') db.set(`logo_4_${Auth.id}`, true)
            if (Input === '5') db.set(`logo_5_${Auth.id}`, true)
            if (Input === '6') db.set(`logo_6_${Auth.id}`, true)
            if (Input === '7') db.set(`logo_7_${Auth.id}`, true)
            if (Input === '8') db.set(`logo_8_${Auth.id}`, true)
            message.react('✅')
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