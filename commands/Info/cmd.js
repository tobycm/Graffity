const { MessageEmbed } = require("discord.js");
const config = require("../../config/config.json");
const ee = require("../../config/embed.json");
module.exports = {
    name: "cmd",
    category: "Info",
    aliases: ["commandinfo", 'cmd'],
    cooldown: 4,
    useage: "cmd [Lệnh]",
    description: "Thông tin các lệnh",
    run: async (client, message, args, user, text, prefix) => {
      try{
        const input = args.join(' ')
        if (!input) {
          message.reply('**🚫 |** Xin hãy ghi tên lệnh!')
          return
        }
        if (input) {
          const embed = new MessageEmbed();
          const cmd = client.commands.get(args[0].toLowerCase()) || client.commands.get(client.aliases.get(args[0].toLowerCase()));
          if (!cmd) {
              return message.channel.send(embed.setColor(ee.wrongcolor).setDescription(`**🚫 |** Không tìm thấy thông tin của lệnh **${args[0].toLowerCase()}**`));
          }
          if (cmd.name) embed.addField("**Tên lệnh**", `\`${cmd.name}\``);
          if (cmd.name) embed.setTitle(`Thông tin lệnh :- \`${cmd.name}\``);
          if (cmd.description) embed.addField("**Mô tả**", `\`${cmd.description}\``);
          if (cmd.aliases) embed.addField("**Kiểu viết**", `\`${cmd.aliases.map((a) => `${a}`).join("`, `")}\``);
          if (cmd.cooldown) embed.addField("**Cooldown**", `\`${cmd.cooldown} Giây\``);
          else embed.addField("**Cooldown**", `\`1 Giây\``);
          if (cmd.usage) {
              embed.addField("**Cách dùng**", `\`${config.prefix}${cmd.usage}\``);
              embed.setFooter("Kí hiệu: <> = bắt buộc, [] = tùy chọn");
          }
          if (cmd.useage) {
              embed.addField("**Cách dùng**", `\`${config.prefix}${cmd.useage}\``);
              embed.setFooter("Kí hiệu: <> = bắt buộc, [] = tùy chọn");
          }
          return message.channel.send(embed.setColor(ee.main));
      }
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