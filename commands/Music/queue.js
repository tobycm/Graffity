const { MessageEmbed } = require("discord.js")
const db = require('quick.db')
const ee = require("../../config/embed.json")
module.exports = {
    name: "queue",
    category: "Music",
    aliases: ["queue"],
    cooldown: 4,
    useage: "queue",
    description: "Xem list nhạc đã thêm",
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
      if(!queue)
        return message.channel.send({embeds:[Empty]})

        let embed = new MessageEmbed()
          .setColor(ee.color)
          .setFooter(ee.footertext,ee.footericon)
          .setTitle(`${vietnamese ? `Queue trong server: **${message.guild.name}**` : `Queue in server: **${message.guild.name}**`}`)

        let counter = 0
        for(let i = 0; i < queue.songs.length; i+=20){
          if(counter >= 10) break
          let k = queue.songs
          let songs = k.slice(i, i + 20)
          message.channel.send({embeds:[embed.setDescription(`${songs.map((song, index) => `**${index + 1 + counter * 20}** :- [${song.name}](${song.url}) - ${song.formattedDuration}\n`)}`)]})
          counter++
        }

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