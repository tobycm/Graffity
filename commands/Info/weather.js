const weather = require('weather-js');
const db = require('quick.db')
const Discord = require('discord.js');
const ee = require('../../config/embed.json')
module.exports = {
    name: 'weather',
    category: 'Info',
    aliases: ['weather', 'wt'],
    cooldown: 2,
    useage: 'weather <tỉnh/thành phố>',
    description: 'Cập nhật thời tiết hôm nay',
    run: (client, message, args, user, text, prefix) => {
        try{
            const { guild } = message
            const langDB = db.get(`lang_${guild.id}`)
            let vietnamese
            if (langDB) vietnamese = true
            if (!langDB) vietnamese = false
            weather.find({search: args.join(" "), degreeType: `C`}, function (error, result) {
                if(error) return message.channel.send(error);
                if(!args[0]) return message.channel.send(`${vietnamese ? `**🚫 |** Xin hãy ghi nơi!` : `**🚫 |** Please enter the location`}`)
    
                if(result === undefined || result.length === 0) return message.reply(`${vietnamese ? `**🚫 |** Vị trí không tồn tại!` : `**🚫 |** This location is invalid!`}`)
    
                var current = result[0].current;
                var location = result[0].location;
    
                message.channel.send(new Discord.MessageEmbed()
                .setAuthor(`${vietnamese ? `Thông tin thời tiết ở ${current.observationpoint}` : `Weather information at ${current.observationpoint}`}`)
                .setThumbnail(current.imageUrl)
                .setDescription(`**${current.skytext}**`)
                .setColor(ee.color)
                .addField(`${vietnamese ? `Múi giờ` : `Timezone`}`, `UTC ${location.timezone}`, true)
                .addField(`${vietnamese ? `Loại nhiệt độ` : `Temperature type`}`, `${vietnamese ? `Độ C` : `°C`}`, true)
                .addField(`${vietnamese ? `Nhiệt độ` : `Temperature`}`, `${current.temperature}°C`, true) 
                .addField(`${vietnamese ? `Tốc độ gió` : `Wind speed`}`, `${current.winddisplay}`, true)
                .addField(`${vietnamese ? `Cảm giác như` : `Feels like`}`, `${current.feelslike}°C`, true)
                .addField(`${vietnamese ? `Độ ẩm` : `Humidity`}`, `${current.humidity}%`, true)
                )
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
    }
}