const { MessageEmbed } = require("discord.js");
const config = require("../../config/config.json");
const ee = require("../../config/embed.json");
module.exports = {
    name: "channelinfo",
    category: "Info",
    aliases: ['channelinfo', 'ch4', 'metan'],
    cooldown: 2,
    useage: "channelinfo <mention kênh>",
    description: "Thông tin về kênh được dùng lệnh",
    run: async (client, message, args, user, text, prefix) => {
    try{
        const Input = message.mentions.channels.first()
        if (!Input) {
            message.reply('**🚫 |** Hãy mention kênh!')
            return
        }
        message.channel.send(new MessageEmbed()
        .setTitle(`Thông tin về kênh - \`${Input.name}\``)
        .setDescription(`**ID kênh**: \`${Input.id}\`\n**Tên kênh**: \`${Input.name}\`\n**Loại kênh**: \`${Input.type}\`\n**Thứ tự kênh**: \`${Input.rawPosition}\`\n**Mô tả**: \`${Input.topic}\`\n**NSFW**: \`${Input.nsfw}\``)
        .setColor(ee.color)
        )
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`**❗️ |** Ôi hỏng rồi | đã xảy ra lỗi!`)
            .setDescription(`\`\`\`${e.stack}\`\`\``)
        );
    }
  }
}