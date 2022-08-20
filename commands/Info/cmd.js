const { MessageEmbed } = require("discord.js")
const db = require('quick.db')
const ee = require("../../config/embed.json")
module.exports = {
    name: "cmd",
    category: "Info",
    aliases: ["commandinfo", 'cmd'],
    cooldown: 4,
    useage: "cmd [Lệnh]",
    description: "Thông tin các lệnh",
    run: async (client, message, args, user, text, prefix) => {
      try{
        const { guild } = message
        const langDB = db.get(`lang_${guild.id}`)
        let vietnamese
        if (langDB) vietnamese = true
        if (!langDB) vietnamese = false
        const input = args.join(' ')
        if (!input) {
          message.reply(`${vietnamese ? `**<:cyber_failed:1002595191082983464> |** Xin hãy ghi tên lệnh!` : `**<:cyber_failed:1002595191082983464> |** Please enter the command's name!`}`)
          return
        }
        if (input) {
          const embed = new MessageEmbed()
          const cmd = client.commands.get(args[0].toLowerCase()) || client.commands.get(client.aliases.get(args[0].toLowerCase()))
          if (!cmd) {
              return message.channel.send(`${vietnamese ? `**<:cyber_failed:1002595191082983464> |** Không tìm thấy thông tin của lệnh **${args[0].toLowerCase()}**` : `**<:cyber_failed:1002595191082983464> |** Can't found information of command: **${args[0].toLowerCase()}**`}`)
          }
          if (cmd.name) embed.addField(`${vietnamese ? `**Tên lệnh**` : `**Command**`}`, `\`${cmd.name}\``)
          if (cmd.description) embed.addField(`${vietnamese ? `**Mô tả**` : `**Description**`}`, `\`${cmd.description}\``)
          if (cmd.aliases) embed.addField(`${vietnamese ? `**Kiểu viết**` : `**Alias**`}`, `\`${cmd.aliases.map((a) => `${a}`).join("`, `")}\``)
          if (cmd.useage) embed.addField(`${vietnamese ? `**Cách dùng**` : `**Usage**`}`, `\`${cmd.useage}\``)
          if (cmd.cooldown) embed.addField(`**Cooldown**`, `\`${cmd.cooldown} s\``)
          else embed.addField(`**Cooldown**`, `\`1s\``)
          return message.channel.send({embeds:[embed.setColor(ee.color)]})
      }
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