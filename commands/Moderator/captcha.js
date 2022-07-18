const Discord = require('discord.js')
const { Captcha } = require('captcha-canvas')
const db = require('quick.db')
const ee = require('../../config/embed.json')
const { MessageButton } = require('discord-buttons')
module.exports = {
    name: 'captcha',
    category: ['Moderator'],
    aliases: ['captcha'],
    cooldown: 2,
    usaege: 'captcha <kênh> <vai trò> <nội dung>',
    description: 'Tạo tin nhắn xác nhận bằng captcha',
    run: async (client, message, args, member) => {
        try {
            const { guild } = message
            const langDB = db.get(`lang_${guild.id}`)
            let vietnamese
            if (langDB) vietnamese = true
            if (!langDB) vietnamese = false
            if (!message.member.hasPermission('MANAGE_ROLES' || 'ADMINISTRATOR' || 'MANAGE_GUILD')) {
                await message.reply(`${vietnamese ? `**🚫 |** Bạn không có quyền để dùng lệnh này!` : `**🚫 |** You do not have permission to use this command!`}`)
                return
            }

            const ch = message.mentions.channels.first()
            const r = message.mentions.roles.first()
            const input = args.slice(2).join(' ')
            if (!ch) return message.reply(`${vietnamese ? `**🚫 |** Hãy mentions một kênh bất kì!!` : `**🚫 |** Please mentions a channel!`}`)
            if (!r) return message.reply(`${vietnamese ? `**🚫 |** Hãy mentions một vai trò! ( dành cho thành viên )` : `**🚫 |** Please mentions a role! ( for member )`}`)
            if (!input) return message.reply(`${vietnamese ? `**🚫 |** Xin hãy ghi một số nội dung!` : `**🚫 |** Please write description!`}`)

            const Embed2 = new Discord.MessageEmbed()
            .setTitle(`${vietnamese ? `<:verifycation:995576719870263338> Xác minh captcha` : `<:verifycation:995576719870263338> Captcha verify`}`)
            .setDescription(`${input}`)
            .setColor(ee.color)
            .setFooter(ee.footertext, ee.footericon)

            const Bt = new MessageButton()
            .setStyle('green')
            .setLabel(`${vietnamese ? `Xác minh` : `Verify`}`)
            .setID('-captcha')
            
            ch.send({
                button: Bt,
                embed: Embed2
            })

            client.on('clickButton', async (button) => {
                if (button.id === '-captcha') {
                    const captcha = new Captcha()
                    captcha.async = true
                    captcha.addDecoy()
                    captcha.drawTrace()
                    captcha.drawCaptcha()

                    const captchaAttachment = new Discord.MessageAttachment(
                        await captcha.png,
                        'captcha.png'
                    )

                    console.log(captcha.text)

                    const Embed = new Discord.MessageEmbed()
                    .setDescription(`${vietnamese ? `**\`✔️\` |** Hãy ghi mã số trong hình ảnh bên dưới` : `**\`✔️\` |** Please solve the captcha image below`}`)
                    .setColor(ee.color)
                    .setImage(`attachment://captcha.png`)
                    .attachFiles(captchaAttachment)

                    const msg = await member.send(Embed)

                    const filter = (message) => {
                        if (message.author.id !== member.id) return ch.send(`${vietnamese ? `**❌ |** Bạn không thể dùng khi người khác đang dùng!` : `**❌ |** You cannot use it while someone else is using it!`}`).then(msg=>msg.delete({timeout: 4000}).catch(e=>console.log(e.message)))
                        if (message.content === captcha.text) return true
                        else member.send(`${vietnamese ? `**❌ |** Sai mã xác thực!` : `**❌ |** Wrong verify code!`}`).then(msg=>msg.delete({timeout: 4000}).catch(e=>console.log(e.message)))
                    }

                    try {
                        const response = await msg.channel.awaitMessages( filter, {
                            max: 1,
                            time: 22000,
                            errors: ['time']
                        })

                        if (response) {
                            text = `${vietnamese ? `<a:629745696576110593:974903524620128297>** |** Đang chuyển hướng...` : `<a:629745696576110593:974903524620128297>** |** Redirecting...`}`
                            member.roles.add(r)
                            member.send(`${vietnamese ? `**\`✔️\` |** Xác minh thành công!` : `**\`✔️\` |** Verification successful!`}`).then(msg=>msg.edit(text, {timeout: 5000}).catch(e=>console.log(e.message))).then(msg=>msg.delete({timeout: 6000}).catch(e=>console.log(e.message)))
                        }
                    } catch (err) {
                        await member.send(`${vietnamese ? `**❌ |** Xác minh thất bại, bạn đã không nhập mã xác thực..` : `**❌ |** Verification failed, you did not enter the verification code..`}`)
                    }
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
    }
}