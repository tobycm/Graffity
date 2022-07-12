const Discord = require('discord.js');
const db = require('quick.db')
const ee = require('../../config/embed.json');
const { parse } = require('twemoji-parser')
module.exports = {
    name: 'emoji',
    category: 'Info',
    aliases: ['emoji', 'emote'],
    cooldown: 2,
    useage: 'emoji <emoji>',
    description: 'Phóng to hình ảnh của emoji đó',
    run: (client, message, args, user, text, prefix) => {
    try{
        const Auth = message.member
      const { guild } = message
      const langDB = db.get(`lang_${guild.id}`)
      let vietnamese
      if (langDB) vietnamese = true
      if (!langDB) vietnamese = false
      const Input = args[0]
      if (!Input) {
        message.reply(`${vietnamese ? `**🚫 |** Hãy nhập một emoji bất kì!` : `**🚫 |** Please enter a emoji!`}`)
        return
      }

      let custom = Discord.Util.parseEmoji(Input)
      const Embed = new Discord.MessageEmbed()
      .setTitle(`${vietnamese ? `Bản phóng to full HD 4K không che của emoji: ${Input}` : `Big scale version of emoji: ${Input}`}`)
      .setColor('RANDOM')

      if (custom.id) {
        let link = `https://cdn.discordapp.com/emojis/${custom.id}.${custom.animated ? 'gif' : 'png'}?size=256`
        Embed.setImage(link)
        .setFooter(`${vietnamese ? `Yêu cầu bởi` : `Request by`} ${Auth.user.tag}`, message.author.avatarURL)
        return message.channel.send(Embed)
      } else {
        let parsed = parse(Input, { assetType: 'png' })
        if (!parsed[0]) {
            message.reply(`${vietnamese ? `**🚫 |** Emoji không hợp lệ!` : `**🚫 |** Invalid emoji!`}`)
            return
        }
        Embed.setImage(parsed[0].url)
        return message.channel.send(Embed)
      }
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return message.channel.send(new Discord.MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`**❗️ |** Ôi hỏng rồi | đã xảy ra lỗi!`)
            .setDescription(`\`\`\`${e.stack}\`\`\``)
        );
    }
  }
}