const {
    MessageEmbed,
    Util: { splitMessage }
} = require('discord.js')
const ee = require('../../config/embed.json')
const { ownerid } = require("../../config/config.json")
const { inspect } = require(`util`)
module.exports = {
    name: 'eval',
    category: 'Owner',
    aliases: ['eval'],
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
            if (!args[0]) {
                await message.reply('**🚫 |** Missing Input!')
                return
            }
    const token = client.token.split("").join("[^]{0,2}");
    const rev = client.token.split("").reverse().join("[^]{0,2}");
    const filter = new RegExp(`${token}|${rev}`, "g");
    let output = await eval(args.join(` `));
    if (output instanceof Promise || (Boolean(output) && typeof output.then === "function" && typeof output.catch === "function")) output = await output;
    //make string out of the evaluation
    output = inspect(output, { depth: 0, maxArrayLength: null });
    //replace with the token
    output = output.replace(filter, "**\\*\\*\\*\\*\\*\\*\\*\\*T\\*O\\*K\\*E\\*N\\*\\*\\*\\*\\*\\*\\*\\***");
    let string = output;
    
    const splitDescription = splitMessage(string, {
        maxLength: 2040,
        char: `\n`,
        prepend: ``,
        append: ``
      })
    console.log(splitDescription)
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