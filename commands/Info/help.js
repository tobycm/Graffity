const { MessageEmbed } = require('discord.js')
const db = require('quick.db')
const ee = require("../../config/embed.json")
const { stripIndent } = require('common-tags')
const disbut = require('discord-buttons')
module.exports = {
    name: 'help',
    category: 'Info',
    aliases: ['help'],
    cooldown: 2,
    usaege: 'help',
    description: 'Cho bạn trợ giúp về bot',
    run: (client, message, args, member) => {
        try {
            const { guild } = message
            const langDB = db.get(`lang_${guild.id}`)
            let vietnamese
            if (langDB) vietnamese = true
            if (!langDB) vietnamese = false
            const Embed0 = new MessageEmbed()
            .setTitle(`${vietnamese ? `Cảm ơn vì đã sử dụng bot Graffity!` : `Thanks for using Graffity!`}`)
            .setDescription(`${vietnamese ? `Một số thứ dưới đây sẽ giúp bạn làm quen với bot:\n\n- Prefix mặc định của bot là \`g-\`. Bạn có thể thay đổi bằng lệnh \`g-prefix\`\n\n- Mention và ping bot để xem prefix hiện tại của bot\n\n- Sử dụng lệnh \`g-help\` để xem các tùy chọn trợ giúp\n\n- Nhập \`g-cmd <tên lệnh>\` để biết thêm info về lệnh\n\n- Dùng lệnh \`g-language <vietnamese/english>\` để đổi ngôn ngữ hiển thị của bot\n\n- Khi gặp lỗi, hãy dùng \`g-report <nội dung> <link ảnh chụp phần lỗi>\` để khắc phục!\n\n- Dưới đây là những nguồn thông tin\ngiúp bạn biết nhiều thứ hơn về bot.\n` : `This is something help you use bot:\n\n- Default prefix is \`g-\`. You can change it with \`g-prefix\`\n\n- Mention and ping bot check current prefix\n\n- Use \`g-help\` to get the help\n\n- Use \`g-cmd <command name>\` to get information of that command\n\n- Use \`g-language <vietnamese/english>\` to change the language\n\n- When you encounter an error, use \`g-report <content> <error snapshot link>\` to fix it!\n\n`}`)
            .addField(`Documents`, '[Link Doc](https://kravon-lidan.gitbook.io/graffity-documents/)')
            .addField(`Website`, `${vietnamese ? `Chưa cập nhật!` : `Comming soon!`}`)
            .addField(`Server Supports`, '[Link Discord](https://dsc.gg/artistcom)')
            .addField(`Server ${vietnamese ? `Cộng đồng` : `Community`}`, '[Link Server](https://discord.gg/G94VjVadv8)')
            .setColor(ee.color)

            let button = new disbut.MessageButton()
            .setStyle('green')
            .setLabel(`${vietnamese ? `Hiện bảng lệnh` : `Show command board`}`)
            .setID('-help')

            member.send({
                button: button,
                embed: Embed0
            })
            message.react('✅')

            client.on('clickButton', async (button) => {
                if (button.id === '-help') {
                  const commands = (category) => {
                    return client.commands
                    .filter(cmd => cmd.category === category)
                    .map(cmd => `\`${cmd.name}\``)
                    .join(', ')
                }

                const Embed = new MessageEmbed()
                .setTitle(`HELP <a:917925228217270303:974903523818995712> COMMAND <a:917925228217270303:974903523818995712> BOARD`)
                .setColor(ee.color)

                const info = client.categories
                .map(cat => stripIndent`**${cat[0].toUpperCase() + cat.slice(1)}** \n${commands(cat)}`)
                .reduce((string, category) => string + `\n` + category)

                return member.send(Embed.setDescription(`${vietnamese ? `Prefix của bot là \`g-\`\nTổng lệnh: \`${client.commands.size}\`\nDùng \`g-cmd <tên lệnh>\` để tìm hiểu thêm` : `Prefix of bot is \`g-\`\nTotal command: \`${client.commands.size}\`\nUse \`g-cmd <command name>\` to know how to use them`}\n${info}`))
                }
            })
            return
        } catch (e) {
            console.log(String(e.stack).bgRed)
            return message.channel.send(new MessageEmbed()
                .setColor(ee.wrongcolor)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(`**❗️ |** Ôi hỏng rồi | đã xảy ra lỗi!`)
                .setDescription(`\`\`\`${e.stack}\`\`\``)
            )
        }
    }
}