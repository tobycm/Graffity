const { MessageEmbed } = require("discord.js")
const db = require('quick.db')
const ee = require("../../config/embed.json")
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
            message.reply(`${vietnamese ? `**<:cyber_failed:1002595191082983464> |** Hãy mention kênh!` : `**<:cyber_failed:1002595191082983464> |** Please mention a channel!`}`)
            return
        }

        const Embed1 = new MessageEmbed()
        .setTitle(`${vietnamese ? `Thông tin về kênh - \`${Input.name}\`` : `Information of channel - \`${Input.name}\``}`)
        .setDescription(`${vietnamese ? `**ID kênh**: \`${Input.id}\`\n**Tên kênh**: \`${Input.name}\`\n**Loại kênh**: \`${Input.type.replace('GUILD_', '')}\`\n**Thứ tự kênh**: \`${Input.rawPosition}\`\n**Mô tả**: \`${Input.topic ? `${Input.topic}` : `Không có nội dung`}\`\n**NSFW**: \`${Input.nsfw ? `Là kênh nsfw` : `Không phải kênh nsfw`}\`` : `**ID**: \`${Input.id}\`\n**Name**: \`${Input.name}\`\n**Type**: \`${Input.type.replace('GUILD_', '')}\`\n**Raw**: \`${Input.rawPosition}\`\n**Topic**: \`${Input.topic ? `${Input.topic}` : `No topic`}\`\n**NSFW**: \`${Input.nsfw ? `This is nsfw channel` : `This is NOT nsfw channel`}\``}`)
        .setColor(ee.color)
        message.channel.send({embeds:[Embed1]})
    } catch (e) {
        console.log(String(e.stack).bgRed)
        const Err = new Discord.MessageEmbed()
.setColor(ee.wrongcolor)
.setFooter(ee.footertext, ee.footericon)
.setTitle(`**<:warning:1001866544797716511> |** Ôi hỏng rồi | đã xảy ra lỗi!`)
.setDescription(`\`\`\`${e.stack}\`\`\``)
return message.channel.send({embeds:[Err]})
    }
  }
}