const Discord = require("discord.js")
const db = require('quick.db')
const ee = require("../../config/embed.json")
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
        
        const Target = message.mentions.members.first() || message.member
        const badge = Target.user.flags.toArray()
        const Member = message.guild.members.cache.get(Target.id)

        const flags = {
            DISCORD_EMPLOYEE: '<:discord_employee:1000709334109528145>',
            DISCORD_PARTNER: '<:partner:1000710205492969542>',
            BUGHUNTER_LEVEL_1: '<:bughunter_level_1:1000709327411232778>',
            BUGHUNTER_LEVEL_2: '<:bughunter_level_2:1000709329260916866>',
            HYPESQUAD_EVENTS: '<:hypesquad_event:1000711254081552408>',
            HOUSE_BRAVERY: '<:house_bravery:1000709345161527406>',
            HOUSE_BRILLIANCE: '<:house_brilliance:1000709347137028166>',
            HOUSE_BALANCE: '<:house_balance:1000709343387320340>',
            EARLY_SUPPORTER: '<:early_supporter:1000709341717987368>',
            TEAM_USER: '<a:regieon:1000711774070374430>',
            SYSTEM: '<:system:1000711357064286281>',
            VERIFIED_BOT: '<:verified_bot:1000709357937369148>',
            VERIFIED_DEVELOPER: '<:verified_developer:1000709325305696276>',
            EARLY_VERIFIED_BOT_DEVELOPER: '<:verified_developer:1000709325305696276>'
        }

        const Embed1 = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setThumbnail(Target.user.avatarURL({ format: 'png', size: 256, dynamic: true}))
        .addField(`${vietnamese ? `Thông tin người dùng` : `User's Information`}`, `**Tag**: ${Target.user.tag}\n**Mention**: <@${Target.id}>\n**ID**: ${Target.id}\n**${vietnamese ? `Acc tạo lúc` : `Created at`}**: <t:${parseInt(Target.user.createdAt /1000)}:F>(<t:${parseInt(Target.user.createdAt /1000)}:R>)\n**Bot**: ${Target.user.bot ? `${vietnamese ? `Có là bot` : `It is bot`}` : `${vietnamese ? `Không phải bot` : `It is user`}`}\n**Badge**: ${badge.length ? badge.map(flag => flags[flag]).join(', ') : `${vietnamese ? `Không có` : `No badge`}`}`)
        .addField(`${vietnamese ? `Thông tin Server` : `Server Information`}`, `**Nickname**: ${Target.displayName}\n**${vietnamese ? `Tham gia lúc` : `Joined at`}**: <t:${parseInt(Target.joinedAt /1000)}:F>(<t:${parseInt(Target.joinedAt /1000)}:R>)\n**Roles**: ${Member.roles.cache.map(r => r).join(' ').replace("@everyone", " ")}`)

        message.channel.send({embeds:[Embed1]})
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