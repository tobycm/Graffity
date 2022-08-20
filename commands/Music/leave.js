const { MessageEmbed } = require("discord.js")
const ee = require("../../config/embed.json")
const db = require('quick.db')
module.exports = {
    name: 'leave',
    category: 'Music',
    aliases: ['leave', 'out'],
    cooldown: 4,
    useage: 'leave',
    description: 'Out kênh thoại bạn đang ở',
    run: async (client, message, args) => {
    try{
      const { guild } = message
      const langDB = await db.get(`lang_${guild.id}`)
      let vietnamese
      if (langDB) vietnamese = true
      if (!langDB) vietnamese = false

      const voiceChannel = message.member.voice.channel
      client.distube.voices.leave(message)
      await message.channel.send(`${vietnamese ? `**<:cyber_success:1002595116164317204> |** Đã rời khỏi kênh thoại <#${voiceChannel.id}>!` : `**<:cyber_success:1002595116164317204> |** Leaved <#${voiceChannel.id}>!`}`)
    } catch (e) {
        console.log(String(e.stack).bgRed)
        const Err = new MessageEmbed()
.setColor(ee.wrongcolor)
.setFooter(ee.footertext, ee.footericon)
.setTitle(`**<:warning:1001866544797716511> |** Ôi hỏng rồi | đã xảy ra lỗi!`)
.setDescription(`\`\`\`${e.stack}\`\`\``)
return message.channel.send({embeds:[Err]})
    }
  }
}
