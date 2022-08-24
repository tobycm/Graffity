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
    description: 'Create captcha verify system',
    run: async (client, message, args, member) => {
        try {
            const { guild } = message
            const langDB = db.get(`lang_${guild.id}`)
            let vietnamese
            if (langDB) vietnamese = true
            if (!langDB) vietnamese = false

            if (!message.member.permissions.has('ADMINISTRATOR' || 'MANAGE_GUILD')) {
                message.reply(`${vietnamese ? `**<:cyber_failed:1002595191082983464> |** Bạn không có quyền để dùng lệnh này!` : `**<:cyber_failed:1002595191082983464> |** You do not have permission to use this command!`}`)
                return
            }

            message.delete()
            const Role = message.mentions.roles.first()
            const Desc = args.slice(1).join(' ')

            if (!Role) return await message.reply(`**<:cyber_failed:1002595191082983464> |** ${vietnamese ? `Xin hãy mentions 1 vai trò! \`g-captcha <vai trò> <nội dung>\`` : `Please mention a role! \`g-captcha <role> <description>\``}`)
            if (!Desc) return await message.reply(`**<:cyber_failed:1002595191082983464> |** ${vietnamese ? `Xin hãy ghi thêm nội dung! \`g-captcha <vai trò> <nội dung>\`` : `Please write some description! \`g-captcha <role> <description>\``}`)

            const Embed = new Discord.MessageEmbed()
                .setTitle(`${vietnamese ? `<:verifycation:995576719870263338> Xác minh captcha` : `<:verifycation:995576719870263338> Captcha verify`}`)
                .setDescription(`${Desc}`)
                .setColor(ee.color)

            const Bt = new Discord.MessageButton()
                .setStyle('SUCCESS')
                .setLabel(`${vietnamese ? `✔️ Xác Thực` : `✔️ Verify`}`)
                .setCustomId('-captcha')

            const row = new Discord.MessageActionRow()
                .addComponents(Bt)

            await message.channel.send({ embeds: [Embed], components: [row] })

            const collector = message.channel.createMessageComponentCollector({
                componentType: 'BUTTON'
            })

            collector.on('collect', async (i) => {
                if (i.customId === '-captcha') {
                    let verifyRole = i.guild.roles.cache.get(Role.id)
                    if (!verifyRole) return

                    if (i.member.roles.cache.has(verifyRole.id)) {
                        await i.user.send(`${vietnamese ? `<@${i.user.id}> Bạn đã xác minh rồi!` : `<@${i.user.id}> You're already verified!`}`)
                        return
                    } else if (!i.member.roles.cache.has(verifyRole.id)) {
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
    
                        const Embed2 = new Discord.MessageEmbed()
                            .setDescription(`${vietnamese ? `**<:cyber_success:1002595116164317204> |** Hãy ghi mã số trong hình ảnh bên dưới` : `**<:cyber_success:1002595116164317204> |** Please solve the captcha image below`}`)
                            .setColor(ee.color)
                            .setImage(`attachment://captcha.png`)
    
                        const cmsg = await i.user.send({ embeds: [Embed2], files: [captchaAttachment] })
                        const msg3 = await message.channel.send(`Check dms <@${i.user.id}>!`)
                        setTimeout(() => msg3.delete(), 4000)

                        await cmsg.channel.awaitMessages({
                            filter: m => m.author.id === i.user.id,
                            max: 1,
                            time: 300000,
                            errors: ['time']
                        }).then(async(value) => {
                            let isValid = value.first().content === captcha.text
                            if (isValid) {
                                await i.member.roles.add(verifyRole).catch((e) => {})
                                i.user.send(`**<:cyber_success:1002595116164317204> |** ${vietnamese ? `Xác thực hoàn thành!` : `Verification success!`}`)
                            } else {
                                i.user.send(`${vietnamese ? `Bạn đã bị kick khỏi server vì không nhập mã xác thực!` : `You have been kicked from the server because you didn't enter verify code!`}`)
                                i.member.kick().catch((e) => {})
                            }
                        }).catch((e) => {
                            i.user.send(`${vietnamese ? `Bạn đã bị kick khỏi server vì không nhập mã xác thực!` : `You have been kicked from the server because you didn't enter verify code!`}`)
                            i.member.kick().catch((e) => {})
                        })
                    }
                }
            })
        } catch (e) {
            console.log(String(e.stack).bgRed)
            const Err = new Discord.MessageEmbed()
                .setColor(ee.wrongcolor)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(`**<:warning:1001866544797716511> |** Ôi hỏng rồi | đã xảy ra lỗi!`)
                .setDescription(`\`\`\`${e.stack}\`\`\``)
            return message.channel.send({ embeds: [Err] })
        }
    }
}