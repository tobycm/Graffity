const Distube = require("distube");
const ee = require("../config/embed.json");
const config = require("../config/config.json");
const { MessageEmbed } = require("discord.js");
const { format } = require("../handlers/functions")
module.exports = (client) => {

  client.distube = new Distube(client, {
    searchSongs: false,
    emitNewSongOnly: false,
    highWaterMark: 1024*1024*64,
    leaveOnEmpty: true,
    leaveOnFinish: true,
    leaveOnStop: true,
    // youtubeCookie --> prevents ERRORCODE: "429"
    youtubeDL: true,
    updateYouTubeDL: true,
    customFilters: {
      "clear": "dynaudnorm=f=200",
      "bassboost": "bass=g=20,dynaudnorm=f=200",
      "8D": "apulsator=hz=0.08",
      "vaporwave": "aresample=48000,asetrate=48000*0.8",
      "nightcore": "aresample=48000,asetrate=48000*1.25",
      "phaser": "aphaser=in_gain=0.4",
      "tremolo": "tremolo",
      "vibrato": "vibrato=f=6.5",
      "reverse": "areverse",
      "treble": "treble=g=5",
      "normalizer": "dynaudnorm=f=200",
      "surrounding": "surround",
      "pulsator": "apulsator=hz=1",
      "subboost": "asubboost",
      "karaoke": "stereotools=mlev=0.03",
      "flanger": "flanger",
      "gate": "agate",
      "haas": "haas",
      "mcompand": "mcompand"
    }

  })

  // Queue status template
  const status = (queue) => `| Âm Lượng: \`${queue.volume}%\`\n| Filter: \`${queue.filter || "Off"}\`\n| Lặp: \`${queue.repeatMode ? queue.repeatMode == 2 ? "Queue" : "Song" : "Off"}\`\n| Tự động phát: \`${queue.autoplay ? "On" : "Off"}\``

  // DisTube event listeners, more in the documentation page
  client.distube
      .on("playSong", (message, queue, song) => message.channel.send(`Đang phát **${song.name}** - \`${song.formattedDuration}\`\nYêu cầu bởi: ${song.user.tag}\n${status(queue)}`)
      )
      .on("addSong", (message, queue, song) => message.channel.send(new MessageEmbed()
          .setDescription("Đã thêm **" + `[${song.name}](${song.url})` + "** vào Queue!")
          .setColor(ee.color)
          .addField("Thời lượng", `\`${song.formattedDuration}\``)
          .setThumbnail(song.thumbnail)
          .setFooter(`Yêu cầu bởi: ${song.user.tag}`, song.user.displayAvatarURL({dynamic: true}))
        )
      )
      .on("playList", (message, queue, playlist, song) => message.channel.send(new MessageEmbed()
            .setDescription("Đang phát danh sách phát **" + `[${playlist.name}](${playlist.url})` + `** - \`[ ${playlist.songs.length} bài ]\``)
            .setColor(ee.color)
            .addField("Nhạc đang phát:", `[${song.name}](${song.url})`)
            .addField("Thời lượng", `\`${playlist.formattedDuration}\``)
            .setThumbnail(playlist.thumbnail.url)
            .setFooter(`Yêu cầu bởi: ${song.user.tag}`, song.user.displayAvatarURL({dynamic: true}))
        )
      )
      .on("addList", (message, queue, playlist) => message.channel.send(new MessageEmbed()
            .setDescription("Đã thêm danh sách phát **" + `[${playlist.name}](${playlist.url})` + `** - \`[ ${playlist.songs.length} bài ] vào Queue!\``)
            .setColor(ee.color)
            .addField("Thời lượng", `\`${playlist.formattedDuration}\``)
            .setThumbnail(playlist.thumbnail.url)
            .setFooter(`Yêu cầu bởi: ${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}))
        )
      )
      .on("searchResult", (message, result) =>
          message.channel.send(new MessageEmbed()
                  .setTitle("**Hãy chọn một thiết lập bên dưới!**")
                  .setURL(song.url)
                  .setColor(ee.color)
                  .setDescription(`${result.map((song, i) => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}\n\n**(!) Nhập phím bất kì hoặc đợi 60 giây để hủy thao tác**`)
                  .setFooter(ee.footertext,ee.footericon)
          )
      )
      .on("searchCancel", (message) => message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`**✅ |** Đã hủy tìm kiếm`)
        )
      )
      .on("error", (message, e) => {
          console.log(String(e.stack).bgRed)
          message.channel.send(new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(ee.footertext, ee.footericon)
              .setTitle(`**❗️ |** Ôi hỏng rồi | đã xảy ra lỗi!`)
              .setDescription(`\`\`\`${e.stack}\`\`\``)
          )
      })
      .on("initQueue", queue => {
          queue.autoplay = false;
          queue.volume = 50;
          queue.filter = "bassboost";
      }
    )

}