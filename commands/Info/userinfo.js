const { MessageEmbed } = require("discord.js");
const db = require('quick.db')
const ee = require("../../config/embed.json");
module.exports = {
    name: 'userinfo',
    category: 'Info',
    aliases: ['userinfo', 'whois'],
    cooldown: 2,
    useage: 'userinfo <mention hoặc không mention>',
    description: 'Thông tin về người dùng',
    run: (client, message, args, user, text, prefix) => {
    try{
        const { guild } = message
        const langDB = db.get(`lang_${guild.id}`)
        let vietnamese
        if (langDB) vietnamese = true
        if (!langDB) vietnamese = false
        const moment = require('moment')
        const Target = message.mentions.members.first() || message.member
        const Member = message.guild.members.cache.get(Target.id)
        message.channel.send(new MessageEmbed()
        .setColor('RANDOM')
        .setThumbnail(Target.user.avatarURL({ format: 'png', size: 128, dynamic: true}))
        .addField(`${vietnamese ? `Thông tin người dùng` : `User's Information`}`, `**Tag**: ${Target.user.tag}\n**Mention**: <@${Target.id}>\n**ID**: ${Target.id}\n**${vietnamese ? `Acc tạo lúc` : `Created at`}**: ${moment(Target.createdAt).format('Do MMMM YYYY, h:mm:ss a')}\n**-** ${moment(Target.createdAt).startOf('day').fromNow()}\n**Bot**: ${Target.user.bot}`)
        .addField(`${vietnamese ? `Thông tin Server` : `Server Information`}`, `**Nickname**: ${Target.displayName}\n**${vietnamese ? `Tham gia lúc` : `Joined at`}**: ${moment(Member.joinedAt).format('Do MMMM YYYY, h:mm:ss a')}\n**-** ${moment(Member.joinedAt).startOf('day').fromNow()}\n**Roles**: ${Member.roles.cache.map(r => r).join(' ').replace("@everyone", " ")}`)
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