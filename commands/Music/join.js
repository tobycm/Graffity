const { MessageEmbed } = require("discord.js")
const ee = require("../../config/embed.json")
const db = require('quick.db')
module.exports = {
    name: 'join',
    category: 'Music',
    aliases: ['join'],
    cooldown: 4,
    useage: 'join',
    description: 'Join kênh thoại bạn đang ở',
    run: async (client, message, args) => {
    try{
      const { guild } = message
      const langDB = await db.get(`lang_${guild.id}`)
      let vietnamese
      if (langDB) vietnamese = true
      if (!langDB) vietnamese = false

      const voiceChannel = message.member.voice.channel
      if (args[0]) {
        voiceChannel = await client.channels.fetch(args[0])
        if (!Constants.VoiceBasedChannelTypes.includes(voiceChannel?.type)) {
          return message.channel.send(`${vietnamese ? `**<:cyber_failed:1002595191082983464> |** Đó không phải kênh thoại hợp lệ!` : `**<:cyber_failed:1002595191082983464> |** That is invalid voice channel!`}`)
        }
      }
      if (!voiceChannel) return message.channel.send(`${vietnamese ? `**<:cyber_failed:1002595191082983464> |** Xin hãy tham gia 1 kênh thoại bất kì!` : `**<:cyber_failed:1002595191082983464> |** You must be in a voice channel or enter a voice channel id!`}`)

      client.distube.voices.join(voiceChannel)
      await message.channel.send(`${vietnamese ? `**<:cyber_success:1002595116164317204> |** Đã tham gia kênh thoại <#${voiceChannel.id}>!` : `**<:cyber_success:1002595116164317204> |** Joinned <#${voiceChannel.id}>!`}`)
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
