const { MessageEmbed } = require('discord.js')
const db = require('quick.db')
const ee = require('../../config/embed.json')
const blank = '<:what:997146780372324443>'
const { Band, Benice, Dangerarea, Greenteam, Loot, Shortway, Sport, Squad } = require('../../config/logo.json')
module.exports = {
    name: 'collect',
    category: 'Graffiti',
    aliases: ['collect', 'collection'],
    cooldown: 2,
    useage: 'collect',
    description: 'Hiển thị bảng sưu tập logo graffity',
    run: (client, message, args, user, text, prefix) => {
    try{
      const { guild } = message
      const langDB = db.get(`lang_${guild.id}`)
      let vietnamese
      if (langDB) vietnamese = true
      if (!langDB) vietnamese = false
      const Auth = message.mentions.members.first() || message.member

      // 1=Band ; 2=Benice ; 3=Dangerarea ; 4=Greenteam ; 5=Loot ; 6=Shortway ; 7=Sport ; 8=Squad 
      const l1 = db.get(`logo_1_${Auth.id}`)
      const l2 = db.get(`logo_2_${Auth.id}`)
      const l3 = db.get(`logo_3_${Auth.id}`)
      const l4 = db.get(`logo_4_${Auth.id}`)
      const l5 = db.get(`logo_5_${Auth.id}`)
      const l6 = db.get(`logo_6_${Auth.id}`)
      const l7 = db.get(`logo_7_${Auth.id}`)
      const l8 = db.get(`logo_8_${Auth.id}`)
      let display1
      let display2
      let display3
      let display4
      let display5
      let display6
      let display7
      let display8
      if (l1) display1 = true
      if (!l1) display1 = false

      if (l2) display2 = true
      if (!l2) display2 = false

      if (l3) display3 = true
      if (!l3) display3 = false 
      
      if (l4) display4 = true
      if (!l4) display4 = false
      
      if (l5) display5 = true
      if (!l5) display5 = false
      
      if (l6) display6 = true
      if (!l6) display6 = false

      if (l7) display7 = true
      if (!l7) display7 = false

      if (l8) display8 = true
      if (!l8) display8 = false
      
      message.channel.send(new MessageEmbed()
      .setColor(ee.color)
      .setFooter(`${vietnamese ? `Để có được badge, bạn cần thắng một minigame của bot hoặc được tặng ở server support` : `To get the badge, you need to win a bot's minigame or get it at the support server`}`)
      .setTitle(`${vietnamese ? `Bảng sưu tập logo graffiti của ${Auth.user.tag}` : `${Auth.user.tag}'s graffiti logo collection board`}`)
      .setDescription(`#Band :- ${display1 ? `${Band}` : `${blank}`} \`-~-\` #BeNice :- ${display2 ? `${Benice}` : `${blank}`}\n
#DangerArea :- ${display3 ? `${Dangerarea}` : `${blank}`} \`-~-\` #Greenteam :- ${display4 ? `${Greenteam}` : `${blank}`}\n
#Loot :- ${display5 ? `${Loot}` : `${blank}`} \`-~-\` #ShortWay :- ${display6 ? `${Shortway}` : `${blank}`}\n
#Sport :- ${display7 ? `${Sport}` : `${blank}`} \`-~-\` #Squad :- ${display8 ? `${Squad}` : `${blank}`}
`)
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