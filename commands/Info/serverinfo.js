const Discord = require("discord.js");
const config = require("../../config/config.json");
const ee = require("../../config/embed.json");
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

        const { createdTimestamp, ownerID, description, members, memberCount, channels, emojis, roles } = guild
        message.channel.send(new Discord.MessageEmbed()
        .setTitle(`Thông tin server **${guild.name}**`)
        .setThumbnail(guild.iconURL({ dynamic: true }))
        .setColor(ee.color)
        .addField(`<:owner:994227377905336370> Owner`, `┕ <@${ownerID}>`, true)
        .addField(`<:description:995578165533610064> Mô tả`, `┕ **${description}**`, true)
        .addField(`<:server:994227361681776661> Tên máy chủ`, `┕ **${guild.name}**`, true)
        .addField(`<:ID:995576738404892684> ID`, `┕ **${guild.id}**`, true)
        .addField(`<:verifycation:995576719870263338> Độ bảo mật`, `┕ **${guild.verificationLevel}**`, true)
        .addField(`<:rules:994227357856571482> Kênh luật lệ`, `┕ **<#${guild.rulesChannelID}>**`, true)
        .addField(`<:slowmode:994227368388464680> Thời gian tạo`, `┕ <t:${parseInt(createdTimestamp / 1000)}:R>`, true)
        .addField(`<:member:994227379742445608> Thành viên`, `┕ **${members.cache.filter((m) => !m.user.bot).size}**`, true)
        .addField(`<:integration:994227353960075285> Bot`, `┕ **${members.cache.filter((m) => m.user.bot).size}**`, true)
        .addField(`<:invite:994227359848869939> Tổng thành viên`, `┕ **${memberCount}**`, true)
        .addField(`<:textchannel:994227366643634266> Kênh văn bản`, `┕ **${channels.cache.filter((ch) => ch.type === 'text').size}**`, true)
        .addField(`<:voicechannel:994227376017899520> Kênh thoại`, `┕ **${channels.cache.filter((ch) => ch.type === 'voice').size}**`, true)
        .addField(`<:thread:994227370108145674> Chủ đề`, `┕ **${channels.cache.filter((ch) => ch.type === 'thread').size}**`, true)
        .addField(`<:createcategory:994227374176616548> Danh mục`, `┕ **${channels.cache.filter((ch) => ch.type === 'category').size}**`, true)
        .addField(`<:store:994227356040450078> Tổng kênh`, `┕ **${channels.cache.size}**`, true)
        .addField(`<:role:994227372293373952> Vai trò`, `┕ **${roles.cache.size}**`, true)
        .addField(`<:boostlv2:994227364324188261> Boost`, `┕ **${guild.premiumTier ? `Lv ${guild.premiumTier}`: 'Không có boost'}**`, true)
        .addField(`<:addemoji:994227352252989450> Emoji máy chủ `, `Emoji thường: **${emojis.cache.filter((e) => !e.animated).size}**\nEmoji động: **${emojis.cache.filter((e) => e.animated).size}**\nTổng emoji: **${emojis.cache.size}**`, true)
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