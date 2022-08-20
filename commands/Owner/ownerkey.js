const { MessageEmbed } = require('discord.js')
const ee = require('../../config/embed.json')
const db = require('quick.db')
module.exports = {
    name: 'ownerkey',
    category: 'Owner',
    aliases: ['ownerkey', 'owner'],
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

            const password = 'rogame0976'
            message.delete()
            if (!args[0]) return await message.channel.send(`${vietnamese ? `**<:cyber_failed:1002595191082983464> |** Hãy ghi mật khẩu!` : `**<:cyber_failed:1002595191082983464> |** Please enter the password!`}`)

            if (args[0] !== password) {
                const msg = await message.channel.send(`${vietnamese ? `**<:cyber_failed:1002595191082983464> |** Sai mật khẩu!` : `**<:cyber_failed:1002595191082983464> |** Wrong password!`}`)
                setTimeout(() => msg.delete(), 4000)
                return
            }

            await message.channel.send(`${vietnamese ? `**<:cyber_success:1002595116164317204> |** Thành công!` : `**<:cyber_success:1002595116164317204> |** Successful!`}`)
            db.set(`access_${guild.id}`, message.author.id)
            console.log(db.fetch(`access_${guild.id}`))
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