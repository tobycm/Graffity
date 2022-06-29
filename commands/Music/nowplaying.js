const { MessageEmbed } = require("discord.js");
const config = require("../../config/config.json");
const ee = require("../../config/embed.json");
const { format, createBar } = require("../../handlers/functions")
module.exports = {
    name: "nowplaying",
    category: "Music",
    aliases: ["np", 'nowplaying'],
    cooldown: 4,
    useage: "nowplaying",
    description: "Thông tin về bài hát đang phát",
    run: async (client, message, args, cmduser, text, prefix) => {
    try{
        const { channel } = message.member.voice
        if (!channel) {
          message.channel.send(`**🚫 |** Xin hãy vào một kênh thoại bất kì!`)
          return
        }
        if(!client.distube.getQueue(message))
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`**🚫 |** Queue trống!`)
        )
        if(client.distube.getQueue(message) && channel.id !== message.guild.me.voice.channel.id) {
            message.channel.send(`**🚫 |** Xin hãy vào kênh thoại **của tôi** trước đã!`)
            return
        }
      let queue = client.distube.getQueue(message);
      let track = queue.songs[0];
      message.channel.send(new MessageEmbed()
        .setColor(ee.color)
        .setFooter(ee.footertext,ee.footericon)
        .setDescription(`<a:StatsLoading:915430394101379083> Đang chơi **[${track.name}](${track.url})**`.substr(0, 256))
        .setThumbnail(track.thumbnail)
        .addField("View", `▶ ${track.views}`,true)
        .addField("Không thích", `:thumbsdown: ${track.dislikes}`,true)
        .addField("Thích", `:thumbsup: ${track.likes}`,true)
        .addField("Thời gian: ", createBar(track.duration*1000, client.distube.getQueue(message).currentTime))
      ).then(msg=>msg.delete({timeout: 4000}).catch(e=>console.log(e.message)))
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