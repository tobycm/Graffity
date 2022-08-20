const { MessageEmbed } = require("discord.js")
const db = require('quick.db')
const ee = require("../../config/embed.json")
const { format, createBar } = require("../../handlers/functions")
module.exports = {
    name: "nowplaying",
    category: "Music",
    aliases: ["np", 'nowplaying'],
    cooldown: 4,
    useage: "nowplaying",
    description: "Thông tin về bài hát đang phát",
    run: async (client, message, args, cmduser, text, prefix) => {
    try{
      const { guild } = message
      const langDB = await db.get(`lang_${guild.id}`)
      let vietnamese
      if (langDB) vietnamese = true
      if (!langDB) vietnamese = false
      const { channel } = message.member.voice
      if (!channel) {
        message.channel.send(`${vietnamese ? `**<:cyber_failed:1002595191082983464> |** Xin hãy vào một kênh thoại bất kì!` : `**<:cyber_failed:1002595191082983464> |** Please join a voice first!`}`)
        return
      }
      if(!client.distube.getQueue(message)) {
        const Empty = new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`${vietnamese ? `**<:cyber_failed:1002595191082983464> |** Queue trống!` : `**<:cyber_failed:1002595191082983464> |** Queue is empty!`}`)

      return message.channel.send({embeds:[Empty]})
      }
      if(client.distube.getQueue(message) && channel.id !== message.guild.me.voice.channel.id) {
          message.channel.send(`${vietnamese ? `**<:cyber_failed:1002595191082983464> |** Xin hãy vào kênh thoại **của tôi** trước đã!` : `**<:cyber_failed:1002595191082983464> |** Please join **my voice** first!`}`)
          return
      }
      let queue = client.distube.getQueue(message)
      let track = queue.songs[0]
      const Track = new MessageEmbed()
      .setColor(ee.color)
      .setFooter(ee.footertext,ee.footericon)
      .setDescription(`${vietnamese ? `<:radio:995576717571801108> Đang chơi **[${track.name}](${track.url})**` : `<:radio:995576717571801108> Playing **[${track.name}](${track.url})**`}`.substr(0, 256))
      .setThumbnail(track.thumbnail)
      .addField("View", `▶ ${track.views}`,true)
      .addField(`${vietnamese ? `Không thích` : `Dislikes`}`, `:thumbsdown: ${track.dislikes}`,true)
      .addField(`${vietnamese ? `Thích` : `Likes`}`, `:thumbsup: ${track.likes}`,true)
      .addField(`${vietnamese ? `Thời gian: ` : `Duration: `}`, createBar(track.duration*1000, queue.currentTime))
    
      message.channel.send({embeds:[Track]})
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