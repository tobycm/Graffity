const { MessageEmbed } = require("discord.js")
const db = require('quick.db')
const ee = require("../../config/embed.json")
module.exports = {
    name: "loop",
    category: "Music",
    aliases: ["repeat", 'loop'],
    cooldown: 4,
    useage: "loop <0/1/2>",
    description: "Lặp lại bài hát/queue",
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

      if(!args[0]) return message.channel.send(`${vietnamese ? `**<:cyber_failed:1002595191082983464> |** Bạn chưa bật chế độ lặp!` : `**<:cyber_failed:1002595191082983464> |** You have not turned on loop mode!`}`)
      
      let options = ['off', 'queue', 'song']
      if (!options.includes(args[0])) return message.reply(`${vietnamese ? `**<:cyber_failed:1002595191082983464> |** Hãy chọn cài đặt hợp lệ! \`off/queue/song\`` : `**<:cyber_failed:1002595191082983464> |** Please choose a valid options! \`off/queue/song\``}`)

      const queue = client.distube.getQueue(message)

      let mode = null
      switch (args[0]) {
        case 'off':
          mode = 0
          break
        case 'song':
          mode = 1
          break
        case 'queue':
          mode = 2
          break
      }

      if( 0 <= mode && mode <= 2){
        mode = queue.setRepeatMode(mode)
        mode = mode ? (mode === 2 ? 'queue' : 'song') : 'Off'
        message.channel.send(`${vietnamese ? `**🔁 |** Chế độ lặp lại được chuyển thành: \`${mode}\`` : `**🔁 |** Repeat mode changed to: \`${mode}\``}`)
      }
      else{
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`**<:cyber_failed:1002595191082983464> |** Bạn chưa bật chế độ lặp`)
          .setDescription(`Usage: \`${prefix}loop <0/1/2>\n0 = tắt\n1 = nhạc hiện tại\n2 = queue\``)
        )
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