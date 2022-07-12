const Discord = require(`discord.js`);
const { ver } = require(`../../config/config.json`);
const ee = require(`../../config/embed.json`);
const cpuStat = require('cpu-stat')
const db = require('quick.db')
module.exports = {
    name: `botinfo`,
    category: `Info`,
    aliases: ['botinfo', 'bot4'],
    cooldown: 2,
    useage: `botinfo`,
    description: `Thông tin về bot`,
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
                const os = require('os');
                const { guild } = message
                const langDB = db.get(`lang_${guild.id}`)
                let vietnamese
                if (langDB) vietnamese = true
                if (!langDB) vietnamese = false
                message.channel.send(new Discord.MessageEmbed()
                    .setColor(ee.color)
                    .setFooter(ee.footertext, ee.footericon)
                    .setTitle(`📝 Loading Client....`)
                ).then(msg=>{
                    msg.edit(new Discord.MessageEmbed()
                    .setTitle(`${vietnamese ? `📝 Thông tin của Graffity Botto ~` : `📝 Information of Graffity Botto ~`}`)
                    .addField(`🧑🏻 Users`, `\`${vietnamese ? `Tổng:` : `Total:`} ${client.users.cache.size} Users\``, true)
                    .addField(`📡 Servers`, `\`${vietnamese ? `Tổng:` : `Total:`} ${client.guilds.cache.size} Servers\``, true)
                    .addField(`\u200b`, `\u200b`, true)
                    .addField(`🔮 Discord.js`, `\`v${Discord.version}\``, true)
                    .addField(`📑 Node`, `\`${process.version}\``, true)
                    .addField(`\u200b`, `\u200b`, true)
                    .addField(`💾 CPU`, `\`\`\`md\n${os.cpus().map((i) => `${i.model}`)[0]}\`\`\``)
                    .addField(`🔧 CPU usage`, `\`${percent.toFixed(2)}%\``, true)
                    .addField(`🤖 Arch`, `\`${os.arch()}\``, true)
                    .addField(`\u200b`, `\u200b`, true)
                    .addField(`${vietnamese ? `💻 Nền tảng` : `💻 Platform`}`, `\`\`${os.platform()}\`\``, true)
                    .addField(`⚙️ API Latency`, `\`${client.ws.ping}ms\``, true)
                    .addField(`\u200b`, `\u200b`, true)
                    .addField(`${vietnamese ? `📦 Bộ nhớ` : `📦 Storage`}`, `\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}/ ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB\``, true)
                    .addField(`⌛️ Uptime `, `${duration(client.uptime).map(i=>`\`${i}\``).join(`, `)}`, true)
                    .addField(`\u200b`, `\u200b`, true)
                    .addField(`${vietnamese ? `🧭 Phiên bản` : `🧭 Version`}`, `\`${ver}\``, true)
                    .addField(`👷🏼 Worker`, `\`1\``, true)
                    .setFooter(`${vietnamese ? `Yêu cầu bởi` : `Request by`} ${Auth.user.tag}`, message.author.avatarURL)
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
                const os = require(`os`);
                message.channel.send(new Discord.MessageEmbed()
                    .setColor(ee.color)
                    .setFooter(ee.footertext, ee.footericon)
                    .setTitle(`📝 Loading Client....`)
                ).then(msg=>{
                    msg.edit(new Discord.MessageEmbed()
                    .setTitle(`${vietnamese ? `📝 Thông tin của Graffity Botto ~` : `📝 Information of Graffity Botto ~`}`)
                    .addField(`🧑🏻 Users`, `\`${vietnamese ? `Tổng:` : `Total:`} ${client.users.cache.size} Users\``, true)
                    .addField(`📡 Servers`, `\`${vietnamese ? `Tổng:` : `Total:`} ${client.guilds.cache.size} Servers\``, true)
                    .addField(`\u200b`, `\u200b`, true)
                    .addField(`🔮 Discord.js`, `\`v${Discord.version}\``, true)
                    .addField(`📑 Node`, `\`${process.version}\``, true)
                    .addField(`\u200b`, `\u200b`, true)
                    .addField(`💾 CPU`, `\`\`\`md\n${os.cpus().map((i) => `${i.model}`)[0]}\`\`\``)
                    .addField(`🔧 CPU usage`, `\`${percent.toFixed(2)}%\``, true)
                    .addField(`🤖 Arch`, `\`${os.arch()}\``, true)
                    .addField(`\u200b`, `\u200b`, true)
                    .addField(`${vietnamese ? `💻 Nền tảng` : `💻 Platform`}`, `\`\`${os.platform()}\`\``, true)
                    .addField(`⚙️ API Latency`, `\`${client.ws.ping}ms\``, true)
                    .addField(`\u200b`, `\u200b`, true)
                    .addField(`${vietnamese ? `📦 Bộ nhớ` : `📦 Storage`}`, `\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}/ ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB\``, true)
                    .addField(`⌛️ Uptime `, `${duration(client.uptime).map(i=>`\`${i}\``).join(`, `)}`, true)
                    .addField(`\u200b`, `\u200b`, true)
                    .addField(`${vietnamese ? `🧭 Phiên bản` : `🧭 Version`}`, `\`${ver}\``, true)
                    .addField(`👷🏼 Worker`, `\`1\``, true)
                    .setFooter(`${vietnamese ? `Yêu cầu bởi` : `Request by`} ${Auth.user.tag}`, message.author.avatarURL)
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
    const { guild } = message
    const langDB = db.get(`lang_${guild.id}`)
    let vietnamese
    if (langDB) vietnamese = true
    if (!langDB) vietnamese = false
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
            let ret = time.days + ` ${vietnamese ? `Ngày` : `Days`}`
            if (time.days !== 1) {
                ret += ''
            }
            parts.push(ret)
        }
        if (time.hours) {
            let ret = time.hours + ` ${vietnamese ? `Giờ` : `Hours`}`
            if (time.hours !== 1) {
                ret += ''
            }
            parts.push(ret)
        }
        if (time.minutes) {
            let ret = time.minutes + ` ${vietnamese ? `Phút` : `Minutes`}`
            if (time.minutes !== 1) {
                ret += ''
            }
            parts.push(ret)

        }
        if (time.seconds) {
            let ret = time.seconds + ` ${vietnamese ? `Giây` : `Seconds`}`
            if (time.seconds !== 1) {
                ret += ''
            }
            parts.push(ret)
        }
        if (useMilli && time.milliseconds) {
            let ret = time.milliseconds + ` ${vietnamese ? `Mili giây` : `Miliseconds`}`
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