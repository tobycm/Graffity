const Discord = require("discord.js");
const { ver } = require("../../config/config.json");
const ee = require("../../config/embed.json");
const cpuStat = require('cpu-stat')
module.exports = {
    name: "botinfo",
    category: "Info",
    aliases: ['botinfo', 'bot4'],
    cooldown: 2,
    useage: "botinfo",
    description: "Thông tin về bot",
    run: async (client, message, args, user, text, prefix) => {
    try{
        cpuStat.usagePercent(function (e, percent, seconds) {
            try {
                if (e) return console.log(String(e.stack).red);

                let connectedchannelsamount = 0;
                let guilds = client.guilds.cache.map((guild) => guild);
                for (let i = 0; i < guilds.length; i++) {
                    if (guilds[i].me.voice.channel) connectedchannelsamount += 1;
                }
                if (connectedchannelsamount > client.guilds.cache.size) connectedchannelsamount = client.guilds.cache.size;

                const Auth = message.member
                const os = require("os");
                
                message.channel.send(new Discord.MessageEmbed()
                    .setColor(ee.color)
                    .setFooter(ee.footertext, ee.footericon)
                    .setTitle(`📝 Loading Client....`)
                ).then(msg=>{
                    msg.edit(new Discord.MessageEmbed()
                    .setTitle("📝 Thông tin của Graffity Botto ~")
                    .addField("🧑🏻 Users", `\`Tổng: ${client.users.cache.size} Users\``, true)
                    .addField("📡 Servers", `\`Tổng: ${client.guilds.cache.size} Servers\``, true)
                    .addField("\u200b", `\u200b`, true)
                    .addField("🔮 Discord.js", `\`v${Discord.version}\``, true)
                    .addField("📑 Node", `\`${process.version}\``, true)
                    .addField("\u200b", `\u200b`, true)
                    .addField("💾 CPU", `\`\`\`md\n${os.cpus().map((i) => `${i.model}`)[0]}\`\`\``)
                    .addField("🔧 CPU usage", `\`${percent.toFixed(2)}%\``, true)
                    .addField("🤖 Arch", `\`${os.arch()}\``, true)
                    .addField("\u200b", `\u200b`, true)
                    .addField("💻 Nền tảng", `\`\`${os.platform()}\`\``, true)
                    .addField("⚙️ API Latency", `\`${client.ws.ping}ms\``, true)
                    .addField("\u200b", `\u200b`, true)
                    .addField("📦 Bộ nhớ", `\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}/ ${(os.totalmem() / 1024 / 1024).toFixed(2)}MB\``, true)
                    .addField("⌛️ Uptime ", `${duration(client.uptime).map(i=>`\`${i}\``).join(", ")}`, true)
                    .addField("\u200b", `\u200b`, true)
                    .addField("🧭 Phiên bản", `\`${ver}\``, true)
                    .addField("👷🏼 Worker", `\`1\``, true)
                    .setFooter(`Yêu cầu bởi ${Auth.user.tag}`, message.author.displayAvatarURL)
                    )
                })

            } catch (e) {
                console.log(e)
                let connectedchannelsamount = 0;
                let guilds = client.guilds.cache.map((guild) => guild);
                for (let i = 0; i < guilds.length; i++) {
                    if (guilds[i].me.voice.channel) connectedchannelsamount += 1;
                }
                if (connectedchannelsamount > client.guilds.cache.size) connectedchannelsamount = client.guilds.cache.size;
                const Auth = message.member
                const os = require("os");
                message.channel.send(new Discord.MessageEmbed()
                    .setColor(ee.color)
                    .setFooter(ee.footertext, ee.footericon)
                    .setTitle(`📝 Loading Client....`)
                ).then(msg=>{
                    msg.edit(new Discord.MessageEmbed()
                    .setTitle("📝 Thông tin của Graffity Botto ~")
                    .addField("🧑🏻 Users", `\`Tổng: ${client.users.cache.size} Users\``, true)
                    .addField("📡 Servers", `\`Tổng: ${client.guilds.cache.size} Servers\``, true)
                    .addField("\u200b", `\u200b`, true)
                    .addField("🔮 Discord.js", `\`v${Discord.version}\``, true)
                    .addField("📑 Node", `\`${process.version}\``, true)
                    .addField("\u200b", `\u200b`, true)
                    .addField("💾 CPU", `\`\`\`md\n${os.cpus().map((i) => `${i.model}`)[0]}\`\`\``)
                    .addField("🔧 CPU usage", `\`${percent.toFixed(2)}%\``, true)
                    .addField("🤖 Arch", `\`${os.arch()}\``, true)
                    .addField("\u200b", `\u200b`, true)
                    .addField("💻 Nền tảng", `\`\`${os.platform()}\`\``, true)
                    .addField("⚙️ API Latency", `\`${client.ws.ping}ms\``, true)
                    .addField("\u200b", `\u200b`, true)
                    .addField("📦 Bộ nhớ", `\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}/ ${(os.totalmem() / 1024 / 1024).toFixed(2)}MB\``, true)
                    .addField("⌛️ Uptime ", `${duration(client.uptime).map(i=>`\`${i}\``).join(", ")}`, true)
                    .addField("\u200b", `\u200b`, true)
                    .addField("🧭 Phiên bản", `\`${ver}\``, true)
                    .addField("👷🏼 Worker", `\`1\``, true)
                    .setFooter(`Yêu cầu bởi ${Auth.user.tag}`, message.author.displayAvatarURL)
                    )
                })
            }
        })
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return message.channel.send(new Discord.MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`**❗️ |** Ôi hỏng rồi | đã xảy ra lỗi!`)
            .setDescription(`\`\`\`${e.stack}\`\`\``)
        )
    }
    function duration(duration, useMilli = false) {
        let remain = duration;
        let days = Math.floor(remain / (1000 * 60 * 60 * 24));
        remain = remain % (1000 * 60 * 60 * 24);
        let hours = Math.floor(remain / (1000 * 60 * 60));
        remain = remain % (1000 * 60 * 60);
        let minutes = Math.floor(remain / (1000 * 60));
        remain = remain % (1000 * 60);
        let seconds = Math.floor(remain / (1000));
        remain = remain % (1000);
        let milliseconds = remain;
        let time = {
            days,
            hours,
            minutes,
            seconds,
            milliseconds
        };
        let parts = []
        if (time.days) {
            let ret = time.days + ' Ngày'
            if (time.days !== 1) {
                ret += ''
            }
            parts.push(ret)
        }
        if (time.hours) {
            let ret = time.hours + ' Giờ'
            if (time.hours !== 1) {
                ret += ''
            }
            parts.push(ret)
        }
        if (time.minutes) {
            let ret = time.minutes + ' Phút'
            if (time.minutes !== 1) {
                ret += ''
            }
            parts.push(ret)

        }
        if (time.seconds) {
            let ret = time.seconds + ' Giây'
            if (time.seconds !== 1) {
                ret += ''
            }
            parts.push(ret)
        }
        if (useMilli && time.milliseconds) {
            let ret = time.milliseconds + ' Mili giây'
            parts.push(ret)
        }
        if (parts.length === 0) {
            return ['Vừa mới chạy']
        } else {
            return parts
        }
    }
    return
  }
}