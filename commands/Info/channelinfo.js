const { MessageEmbed } = require("discord.js");
const db = require('quick.db')
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
        const { guild } = message
        const langDB = db.get(`lang_${guild.id}`)
        let vietnamese
        if (langDB) vietnamese = true
        if (!langDB) vietnamese = false
        const Input = message.mentions.channels.first()
        if (!Input) {
            message.reply(`${vietnamese ? `**🚫 |** Hãy mention kênh!` : `**🚫 |** Please mention a channel!`}`)
            return
        }
        message.channel.send(new MessageEmbed()
        .setTitle(`${vietnamese ? `Thông tin về kênh - \`${Input.name}\`` : `Information of channel - \`${Input.name}\``}`)
        .setDescription(`${vietnamese ? `**ID kênh**: \`${Input.id}\`\n**Tên kênh**: \`${Input.name}\`\n**Loại kênh**: \`${Input.type}\`\n**Thứ tự kênh**: \`${Input.rawPosition}\`\n**Mô tả**: \`${Input.topic}\`\n**NSFW**: \`${Input.nsfw}\`` : `**ID**: \`${Input.id}\`\n**Name**: \`${Input.name}\`\n**Type**: \`${Input.type}\`\n**Raw**: \`${Input.rawPosition}\`\n**Topic**: \`${Input.topic}\`\n**NSFW**: \`${Input.nsfw}\``}`)
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