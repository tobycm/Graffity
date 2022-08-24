const {
    MessageEmbed,
    Util: { splitMessage }
} = require('discord.js')
const ee = require('../../config/embed.json')
const { ownerid } = require("../../config/config.json")
const { inspect } = require(`util`)
const db = require('quick.db')
module.exports = {
    name: 'eval',
    category: 'Owner',
    aliases: ['eval'],
    cooldown: 2,
    useage: 'None',
    description: 'None',
    run: async (client, message, args) => {
        try {
            const { guild } = message
            const langDB = db.get(`lang_${guild.id}`)
            let vietnamese
            if (langDB) vietnamese = true
            if (!langDB) vietnamese = false

            let Userid = message.author.id
            const Auth = message.member
db.fetch(`access_${Auth.id}`)
            if (Userid !== ownerid || Userid !== owner) {
                await message.reply(`${vietnamese ? `**\`🔒\` |** Bạn không phải owner của bot!` : `**\`🔒\` |** You're not owner of bot!`}`)
                return
            }

            if (Userid === owner || Userid === ownerid) {
                if (!args[0]) {
                    await message.reply('**<:cyber_failed:1002595191082983464> |** Missing Input!')
                    return
                }
                const token = client.token.split("").join("[^]{0,2}")
                const rev = client.token.split("").reverse().join("[^]{0,2}")
                const filter = new RegExp(`${token}|${rev}`, "g")
                let output = await eval(args.join(` `))
                if (output instanceof Promise || (Boolean(output) && typeof output.then === "function" && typeof output.catch === "function")) output = await output
                //make string out of the evaluation
                output = inspect(output, { depth: 0, maxArrayLength: null })
                //replace with the token
                output = output.replace(filter, "**\\*\\*\\*\\*\\*\\*\\*\\*T\\*O\\*K\\*E\\*N\\*\\*\\*\\*\\*\\*\\*\\***")
                let string = output
                
                const splitDescription = splitMessage(string, {
                    maxLength: 2040,
                    char: `\n`,
                    prepend: ``,
                    append: ``
                })
                console.log(splitDescription)
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