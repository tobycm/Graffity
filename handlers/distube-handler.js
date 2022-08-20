const { DisTube } = require('distube')
const ee = require("../config/embed.json");
const config = require("../config/config.json");
const Discord = require("discord.js");
const { format } = require("../handlers/functions")
const db = require('quick.db')
module.exports = (client) => {
  client.distube = new DisTube(client, {
    emitNewSongOnly: true,
    emitAddSongWhenCreatingQueue: false,
    emitAddListWhenCreatingQueue: false,
    leaveOnEmpty: true,
    leaveOnFinish: false,
    leaveOnStop: true,
    // youtubeCookie --> prevents ERRORCODE: "429"
    youtubeDL: true,
    updateYouTubeDL: true
  })

  // queue status
  const status = (queue) => `| Volume: \`${queue.volume}%\`\n| Filter: \`${"Off" || queue.filter}\`\n| Repeat: \`${queue.repeatMode ? queue.repeatMode == 2 ? "Queue" : "Song" : "Off"}\`\n| Autoplay: \`${queue.autoplay ? "On" : "Off"}\``

  // event queue
  client.distube
  .on('playSong', async(queue, song) => {
    const Playing = new Discord.MessageEmbed()
    .setDescription(`<a:nowplay:995571939986911294> Playing **${song.name}** - \`${song.formattedDuration}\`\n| Link: [Link video](${song.url})\n\n${status(queue)}`)
    .setThumbnail(song.thumbnail)
    .setColor(ee.color)
    .setFooter(`Request by: ${song.user.tag}`, song.user.displayAvatarURL({dynamic: true}))
    queue.textChannel.send({embeds:[Playing]})
  })
  .on('addSong', (queue, song) => {
    const AddSong = new Discord.MessageEmbed()
    .setDescription(`<:radio:995576717571801108> Added **[${song.name}](${song.url})** to Queue!`)
    .setColor(ee.color)
    .addField(`Duration`, `\`${song.formattedDuration}\``)
    .setThumbnail(song.thumbnail)
    .setFooter(`Request by: ${song.user.tag}`, song.user.displayAvatarURL({dynamic: true}))
  
    queue.textChannel.send({embeds:[AddSong]})
  })
  .on('addList', (queue, playlist) => {
    const AddList = new Discord.MessageEmbed()
    .setDescription(`<:radio:995576717571801108> Added playlist **[${playlist.name}](${playlist.url}) ** - \`[ ${playlist.songs.length} songs ] to Queue!\``)
    .setColor(ee.color)
    .addField(`Duration`, `\`${song.formattedDuration}\``)
    .setThumbnail(playlist.thumbnail.url)
    .setFooter(`Request by: ${song.user.tag}`, song.user.displayAvatarURL({dynamic: true}))

    queue.textChannel.send({embeds:[AddList]})
  })
  .on('error', (channel, e) => {
    const Err = new Discord.MessageEmbed()
    .setColor(ee.wrongcolor)
    .setFooter(ee.footertext, ee.footericon)
    .setTitle(`**<:warning:1001866544797716511> |** Ôi hỏng rồi | đã xảy ra lỗi!`)
    .setDescription(`\`\`\`${e.stack}\`\`\``)

    channel.send({embeds:[Err]})
    console.log(String(e).bgRed)
  })
  .on('empty', channel => {
    channel.send(`**<:cyber_failed:1002595191082983464> |** Queue is empty lol ;P`)
  })
  .on('searchNoResult', (message, query) => {
    message.channel.send(`**<:cyber_failed:1002595191082983464> |** I cant find \`${query}\`!`)
  })
  .on('finish', queue => queue.textChannel.send(`**<:Huh:1008734527461531668> |** Finished, please use \`g-play <name/link>\` to continue`))
  .on('initQueue', queue => {
    queue.autoplay = false
    queue.volume = 100
    queue.filter = false
  })
}