const { MessageEmbed, User } = require("discord.js");
const { ownerid } = require("../../config/config.json");
const ee = require("../../config/embed.json");
module.exports = {
    name: "say",
    category: "Owner",
    aliases: ['say', 's'],
    cooldown: 1,
    useage: "None",
    description: "None",
    run: async (client, message, args, cmduser, text, prefix) => {
        try {
            let Userid = message.author.id
            if (Userid !== ownerid) {
                await message.reply('**🚫 |** Bạn không phải owner của bot!')
                return
            }
            const Input = args.join(' ')
            if (!Input) {
                await message.reply('**🚫 |** Missing Input!')
                return
            }
            await message.delete()
            await message.channel.send(`${Input}`)
        } catch (e) {
            console.log(String(e.stack).bgRed)
            return message.channel.send(new MessageEmbed()
                .setColor(ee.wrongcolor)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(`**❗️ |** Ôi hỏng rồi | đã xảy ra lỗi!`)
                .setDescription(`\`\`\`${e.stack}\`\`\``)
            )
        }
    }
}