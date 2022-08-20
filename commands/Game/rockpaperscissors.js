const Discord = require('discord.js')
const db = require('quick.db')
const ee = require('../../config/embed.json')
module.exports = {
    name: 'rockpaperscissors',
    category: ['Game'],
    aliases: ['rockpaperscissors', 'rps'],
    cooldown: 2,
    useage: 'rockpaperscissors <mention hoặc ko mention>',
    description: 'chơi kéo búa bao',
    run: async (client, message, args, member) => {
        const { guild } = message
        const langDB = db.get(`lang_${guild.id}`)
        let vietnamese
        if (langDB) vietnamese = true
        if (!langDB) vietnamese = false

        let Choose = [
            '🗻',
            '📰',
            '✂️'
        ]

        const botChoice = Choose[Math.floor(Math.random() * Choose.length)]

        const Embed = new Discord.MessageEmbed()
        .setAuthor(`${message.member.user.tag} ${vietnamese ? `đã thách đấu kéo búa bao với bot!` : `challenged to a rock paper scissor match with bots!`}`, message.member.displayAvatarURL({ dynamic: true }))
        .setDescription(`${vietnamese ? `Hãy chọn kéo/búa/bao như bên dưới!` : `Please choose rock/paper/scissor below!`}`)
        .setColor(ee.color)
        .setFooter(`🎲 ~ ${vietnamese ? `Đang trong lượt` : `In process`}`)

        const Rock = new Discord.MessageButton()
        .setCustomId('-rock')
        .setLabel('🗻')
        .setStyle('PRIMARY')

        const Paper = new Discord.MessageButton()
        .setCustomId('-paper')
        .setLabel('📰')
        .setStyle('PRIMARY')

        const Scissor = new Discord.MessageButton()
        .setCustomId('-sci')
        .setLabel('✂️')
        .setStyle('PRIMARY')

        const row = new Discord.MessageActionRow()
        .addComponents(Rock, Paper, Scissor)

        const msg = await message.channel.send({ embeds: [Embed], components: [row] })

        setTimeout(() => msg.edit({ content: `**🕐 |** ${vietnamese ? `Bot đợi quá lâu, bạn đã mất lượt!` : `Bot waits too long, you lost your turn!`}`, embeds: [], components: [] }), 10000)
        // system
        let result
        let userChoose
        let endColor

        const filter = f => f.user.id === message.author.id
        const collector = message.channel.createMessageComponentCollector({
            filter,
            time: 10000,
            max: 1
        })

        collector.on('collect', async(i) => {
            if (i.customId === '-rock') {
                userChoose = '🗻'
                played = true
                if (botChoice === '🗻') result = `${vietnamese ? `Chúng ta hòa rùi!` : `We tie!`}`
                if (botChoice === '📰') result = `${vietnamese ? `Bạn đã thua trắng!` : `You lost!`}`
                if (botChoice === '✂️') result = `${vietnamese ? `Bạn đã thắng!` : `You won!`}`
            }
            if (i.customId === '-paper') {
                userChoose = '📰'
                played = true
                if (botChoice === '📰') result = `${vietnamese ? `Chúng ta hòa rùi!` : `We tie!`}`
                if (botChoice === '✂️') result = `${vietnamese ? `Bạn đã thua trắng!` : `You lost!`}`
                if (botChoice === '🗻') result = `${vietnamese ? `Bạn đã thắng!` : `You won!`}`
            }
            if (i.customId === '-sci') {
                userChoose = '✂️'
                played = true
                if (botChoice === '✂️') result = `${vietnamese ? `Chúng ta hòa rùi!` : `We tie!`}`
                if (botChoice === '🗻') result = `${vietnamese ? `Bạn đã thua trắng!` : `You lost!`}`
                if (botChoice === '📰') result = `${vietnamese ? `Bạn đã thắng!` : `You won!`}`
            }

            if (result === `${vietnamese ? `Bạn đã thua trắng!` : `You lost!`}`) endColor = ee.wrongcolor
            if (result === `${vietnamese ? `Chúng ta hòa rùi!` : `We tie!`}`) endColor = ee.color
            if (result === `${vietnamese ? `Bạn đã thắng!` : `You won!`}`) endColor = ee.truecolor

            const EmbedEnd = new Discord.MessageEmbed()
            .setAuthor(`${result}`, message.member.displayAvatarURL({ dynamic: true }))
            .setDescription(`${vietnamese ? `Bot chọn: \`${botChoice}\`\nBạn chọn: \`${userChoose}\`` : `Bot choose: \`${botChoice}\`\nYou choose: \`${userChoose}\``}`)
            .setFooter(`🎲 ~ ${result}`)
            .setColor(endColor)

            i.update({ embeds: [EmbedEnd], components: [] })

            setTimeout(() => msg.edit({ content: `**<:YA_Hmmge:989530736249954374> |** ${vietnamese ? `Lượt chơi này kết thúc mất rùi, mời bạn chơi lại lượt khác nha \`tip: g-rps\`` : `This round is over, please play it again \`tip: g-rps\``}`, embeds: [], components: []}), 5000)
            setTimeout(() => msg.delete(), 8940)
            return
        })
    }
}