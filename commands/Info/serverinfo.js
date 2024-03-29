const Discord = require("discord.js")
const db = require('quick.db')
const ee = require("../../config/embed.json")
module.exports = {
    name: 'serverinfo',
    category: 'Info',
    aliases: ['serverinfo', 'sv4', 'server'],
    cooldown: 2,
    useage: "serverinfo",
    description: "Thông tin về server bạn dùng lệnh",
    run: async (client, message, args, user, text, prefix) => {
    try{
        const { guild } = message
        const langDB = db.get(`lang_${guild.id}`)
        let vietnamese
        if (langDB) vietnamese = true
        if (!langDB) vietnamese = false
        const { createdTimestamp, ownerId, description, members, memberCount, channels, emojis, roles } = guild
        const Embed1 = new Discord.MessageEmbed()
        .setTitle(`${vietnamese ? `Thông tin server **${guild.name}**` : `Information of server **${guild.name}**`}`)
        .setThumbnail(guild.iconURL({ dynamic: true }))
        .setColor(ee.color)
        .addField(`<:owner:994227377905336370> Owner`, `┕ <@${ownerId}>`, true)
        .addField(`<:description:995578165533610064> ${vietnamese ? `Mô tả` : `Description`}`, `┕ **${description ? `${description}` : `${vietnamese ? `Không có mô tả!` : `No description!`}`}**`, true)
        .addField(`<:server:994227361681776661> ${vietnamese ? `Tên máy chủ` : `Server's name`}`, `┕ **${guild.name}**`, true)
        .addField(`<:ID:995576738404892684> ID`, `┕ **${guild.id}**`, true)
        .addField(`<:verifycation:995576719870263338> ${vietnamese ? `Độ bảo mật` : `Verification`}`, `┕ **${guild.verificationLevel}**`, true)
        .addField(`<:rules:994227357856571482> ${vietnamese ? `Kênh luật lệ` : `Rule channel`}`, `┕ **${guild.rulesChannelId ? `<#${guild.rulesChannelId}>` : `${vietnamese ? `Không có kênh luật lệ` : `No rule channel`}`}**`, true)
        .addField(`<:slowmode:994227368388464680> ${vietnamese ? `Thời gian tạo` : `Create at`}`, `┕ <t:${parseInt(createdTimestamp / 1000)}:R>`, true)
        .addField(`<:member:994227379742445608> ${vietnamese ? `Thành viên` : `Member`}`, `┕ **${members.cache.filter((m) => !m.user.bot).size}**`, true)
        .addField(`<:integration:994227353960075285> Bot`, `┕ **${members.cache.filter((m) => m.user.bot).size}**`, true)
        .addField(`<:invite:994227359848869939> ${vietnamese ? `Tổng thành viên` : `Total member`}`, `┕ **${memberCount}**`, true)
        .addField(`<:textchannel:994227366643634266> ${vietnamese ? `Kênh văn bản` : `Text channel`}`, `┕ **${channels.cache.filter((ch) => ch.type === 'GUILD_TEXT' && 'GUILD_NEWS').size}**`, true)
        .addField(`<:voicechannel:994227376017899520> ${vietnamese ? `Kênh thoại` : `Voice channel`}`, `┕ **${channels.cache.filter((ch) => ch.type === 'GUILD_VOICE' && 'GUILD_STAGE_VOICE').size}**`, true)
        .addField(`<:thread:994227370108145674> ${vietnamese ? `Chủ đề` : `Thread`}`, `┕ **${channels.cache.filter((ch) => ch.type === 'GUILD_PUBLIC_THREAD' && 'GUILD_PRIVATE_THREAD' && 'GUILD_NEWS_THREAD').size}**`, true)
        .addField(`<:createcategory:994227374176616548> ${vietnamese ? `Danh mục` : `Category`}`, `┕ **${channels.cache.filter((ch) => ch.type === 'GUILD_CATEGORY').size}**`, true)
        .addField(`<:store:994227356040450078> ${vietnamese ? `Tổng kênh` : `Total channel`}`, `┕ **${channels.cache.size}**`, true)
        .addField(`<:role:994227372293373952> ${vietnamese ? `Vai trò` : `Roles`}`, `┕ **${roles.cache.size}**`, true)
        .addField(`<:boostlv2:994227364324188261> Boost`, `┕ **${guild.premiumTier ? `Lv ${guild.premiumTier.replace('TIER_', '')}`: `${vietnamese ? `Không có boost` : `No Boost`}`}**`, true)
        .addField(`<:addemoji:994227352252989450> Emoji`, `${vietnamese ? `Emoji thường` : `Normal emoji`}: **${emojis.cache.filter((e) => !e.animated).size}**\n${vietnamese ? `Emoji động` : `Animated emoji`}: **${emojis.cache.filter((e) => e.animated).size}**\n${vietnamese ? `Tổng emoji` : `Total emoji`}: **${emojis.cache.size}**\nStickers: **${guild.stickers.cache.size}**`, true)
        
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