const { MessageEmbed } = require("discord.js")
const config = require("../../config/config.json")
const ee = require("../../config/embed.json")
module.exports = {
    name: 'help',
    category: 'Info',
    aliases: ['help'],
    cooldown: 2,
    usaege: 'help',
    description: 'none',
    run: (message, args, client, member) => {
        try {
            member.send(new MessageEmbed()
            .setTitle('Cảm ơn vì đã sử dụng bot Graffity!')
            .setDescription('Một số thứ dưới đây sẽ giúp bạn làm quen với bot:\n\n- Prefix mặc định của bot là `g-`. Bạn có thể thay đổi bằng lệnh `g-prefix`\n\n- Mention và ping bot để xem prefix hiện tại của bot\n\n- Sử dụng lệnh `g-help` để xem các tùy chọn trợ giúp\n\n- Nhập `g-cmd <tên lệnh>` để biết thêm info về lệnh\n\n- Dưới đây là những nguồn thông tin\ngiúp bạn biết nhiều thứ hơn về bot.\n')
            .addField('Documents', '[Link Doc](https://kravon-lidan.gitbook.io/graffity-documents/)')
            .addField('Website', 'Chưa cập nhật!')
            .addField('Server Supports', '[Link Discord](https://dsc.gg/artistcom)')
            .addField('Server Cộng đồng', '[Link Server](https://discord.gg/G94VjVadv8)')
            .setColor(ee.color)
            )
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