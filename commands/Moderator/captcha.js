const Discord = require('discord.js')
const { Captcha } = require('captcha-canvas')
const { ownerid } = require("../../config/config.json")
const db = require('quick.db')
const ee = require('../../config/embed.json')
module.exports = {
    name: 'captcha',
    category: 'Moderator',
    aliases: ['captcha'],
    cooldown: 2,
    useage: 'captcha',
    description: 'None',
    run: async (client, message, args, member) => {
        try {
            const { guild } = message
            const langDB = db.get(`lang_${guild.id}`)
            let vietnamese
            if (langDB) vietnamese = true
            if (!langDB) vietnamese = false

            let Userid = message.author.id
            const owner = db.fetch(`access_${guild.id}`)
            if (Userid !== ownerid || Userid !== owner) {
                await message.reply(`${vietnamese ? `**\`🔒\` |** Bạn không phải owner của bot!` : `**\`🔒\` |** You're not owner of bot!`}`)
                return
            }

            message.delete()
            message.channel.send(`Check DMs, <@${message.author.id}>!`).then(msg=>msg.delete({timeout: 4000}).catch(e=>console.log(e.message)))
            const currentchannel = db.fetch(`verify_channel_${message.guild.id}`)
            if (message.channel.id !== currentchannel) return message.reply(`${vietnamese ? `**<:cyber_failed:1002595191082983464> |** Sai kênh rồi!, kênh nhận xác thực là <#${currentchannel}>` : `**<:cyber_failed:1002595191082983464> |** Wrong verify channel! vefiry channel is <#${currentchannel}>`}`).then(msg=>msg.delete({timeout: 4000}).catch(e=>console.log(e.message)))
            const currentrole = db.fetch(`verify_role_${message.guild.id}`)

            const FindChannel = message.guild.channels.cache.find(ch => ch.id === currentchannel)

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
            .setDescription(`${vietnamese ? `**\`<:cyber_success:1002595116164317204>\` |** Hãy ghi mã số trong hình ảnh bên dưới` : `**\`<:cyber_success:1002595116164317204>\` |** Please solve the captcha image below`}`)
            .setColor(ee.color)
            .setImage(`attachment://captcha.png`)
            .attachFiles(captchaAttachment)

            const msg = await member.send(Embed)

            const filter = (message) => {
                if (message.author.id !== member.id) return FindChannel.send(`${vietnamese ? `**<:cyber_failed:1002595191082983464> |** Bạn không thể dùng khi người khác đang dùng!` : `**<:cyber_failed:1002595191082983464> |** You cannot use it while someone else is using it!`}`).then(msg=>msg.delete({timeout: 4000}).catch(e=>console.log(e.message)))
                if (message.content === captcha.text) return true
                else member.send(`${vietnamese ? `**<:cyber_failed:1002595191082983464> |** Sai mã xác thực!` : `**<:cyber_failed:1002595191082983464> |** Wrong verify code!`}`).then(msg=>msg.delete({timeout: 4000}).catch(e=>console.log(e.message)))
            }

            try {
                const response = await msg.channel.awaitMessages( filter, {
                    max: 1,
                    time: 134000,
                    errors: ['time']
                })

                if (response) {
                    text = `${vietnamese ? `<a:629745696576110593:974903524620128297>** |** Đang chuyển hướng...` : `<a:629745696576110593:974903524620128297>** |** Redirecting...`}`
                    member.roles.add(currentrole)
                    member.send(`${vietnamese ? `**\`<:cyber_success:1002595116164317204>\` |** Xác minh thành công!` : `**\`<:cyber_success:1002595116164317204>\` |** Verification successful!`}`).then(msg=>msg.edit(text, {timeout: 5000}).catch(e=>console.log(e.message))).then(msg=>msg.delete({timeout: 6000}).catch(e=>console.log(e.message)))
                }
            } catch (err) {
                await member.send(`${vietnamese ? `**<:cyber_failed:1002595191082983464> |** Xác minh thất bại, bạn đã không nhập mã xác thực..` : `**<:cyber_failed:1002595191082983464> |** Verification failed, you did not enter the verification code..`}`)
            }
        } catch (e) {
            console.log(String(e.stack).bgRed)
            const Err = new Discord.MessageEmbed()
.setColor(ee.wrongcolor)
.setFooter(ee.footertext, ee.footericon)
.setTitle(`**<:warning:1001866544797716511> |** Ôi hỏng rồi | đã xảy ra lỗi!`)
.setDescription(`\`\`\`${e.stack}\`\`\``)
return message.channel.send({embeds:[Err]})
        }
    }
}