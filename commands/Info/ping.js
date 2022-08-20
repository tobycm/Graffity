const { MessageEmbed } = require("discord.js")
const db = require('quick.db')
const ee = require("../../config/embed.json")
module.exports = {
    name: "ping",
    category: "Info",
    aliases: ["ping"],
    cooldown: 2,
    useage: "ping",
    description: "Thông tin API và bot",
    run: (client, message, args, user, text, prefix) => {
    try{
      const { guild } = message
      const langDB = db.get(`lang_${guild.id}`)
      let vietnamese
      if (langDB) vietnamese = true
      if (!langDB) vietnamese = false

      const Embed1 = new MessageEmbed()
      .setColor(ee.color)
      .setFooter(ee.footertext, ee.footericon)
      .setTitle(`🏓 Ping pong po....`)
    
      const Embed2 = new MessageEmbed()
      .setColor(ee.color)
      .setFooter(ee.footertext, ee.footericon)
      .setTitle(`${vietnamese ? `🏓 Ping Bot là \`${Math.floor((Date.now() - message.createdTimestamp) - 2 * Math.floor(client.ws.ping))} ms\`\n\n🏓 Ping API là \`${Math.floor(client.ws.ping)} ms\`` : `🏓 Bot'ping is \`${Math.floor((Date.now() - message.createdTimestamp) - 2 * Math.floor(client.ws.ping))} ms\`\n\n🏓 API's ping is \`${Math.floor(client.ws.ping)} ms\``}`)
    
      message.channel.send({embeds:[Embed1]}).then(msg=>{
        msg.edit({embeds:[Embed2]})
      })
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