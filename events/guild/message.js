const ee = require("../../config/embed.json"); //Loading all embed settings like color footertext and icon ...
const Discord = require("discord.js"); //this is the official discord.js wrapper for the Discord Api, which we use!
const { escapeRegex } = require("../../handlers/functions"); //Loading all needed functions
const db = require('quick.db')

const validatePermissions = (permissions) => {
  const validPermissions = [
    'CREATE_INSTANT_INVITE',
    'KICK_MEMBERS',
    'BAN_MEMBERS',
    'ADMINISTRATOR',
    'MANAGE_CHANNELS',
    'MANAGE_GUILD',
    'ADD_REACTIONS',
    'VIEW_AUDIT_LOG',
    'PRIORITY_SPEAKER',
    'STREAM',
    'VIEW_CHANNEL',
    'SEND_MESSAGES',
    'SEND_TTS_MESSAGES',
    'MANAGE_MESSAGES',
    'EMBED_LINKS',
    'ATTACH_FILES',
    'READ_MESSAGE_HISTORY',
    'MENTION_EVERYONE',
    'USE_EXTERNAL_EMOJIS',
    'VIEW_GUILD_INSIGHTS',
    'CONNECT',
    'SPEAK',
    'MUTE_MEMBERS',
    'DEAFEN_MEMBERS',
    'MOVE_MEMBERS',
    'USE_VAD',
    'CHANGE_NICKNAME',
    'MANAGE_NICKNAMES',
    'MANAGE_ROLES',
    'MANAGE_WEBHOOKS',
    'MANAGE_EMOJIS',
  ]

  for (const permission of permissions) {
    if (!validPermissions.includes(permission)) {
      throw new Error(`quyền không xác định: "${permission}"`)
    }
  }
}
//here the event starts
module.exports = async (client, message, commandOptions) => {
  try {
    //if the message is not in a guild (aka in dms), return aka ignore the inputs
    if (!message.guild) return;
    // if the message  author is a bot, return aka ignore the inputs
    if (message.author.bot) return;
    //if the channel is on partial fetch it
    if (message.channel.partial) await message.channel.fetch();
    //if the message is on partial fetch it
    if (message.partial) await message.fetch();
    //get the current prefix from the botconfig/config.json
    const { prefix } = require('../../config/config.json')
    let sv_prefix = db.fetch(`prefix_${message.guild.id}`)
    if(sv_prefix === null) sv_prefix = db.set(`prefix_${message.guild.id}`, prefix)
    const prefixRegex = new RegExp(`^(<@!?>|${escapeRegex(sv_prefix)})\\s*`)

    // reset prefix khẩn cấp
    if (message.content === 'reset') {
      message.react('✅')
      db.set(`prefix_${message.guild.id}`, prefix)
    }
    
    //if its not that then return
    if (!prefixRegex.test(message.content)) return;
    //now define the right prefix either ping or not ping
    const [, matchedPrefix] = message.content.match(prefixRegex);
    //create the arguments with sliceing of of the rightprefix length
    const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
    //creating the cmd argument by shifting the args by 1
    const cmd = args.shift().toLowerCase();
    //if no cmd added return error
    if (cmd.length === 0) return message.channel.send(new Discord.MessageEmbed()
      .setColor(ee.wrongcolor)
      .setFooter(ee.footertext, ee.footericon)
      .setTitle(`**🚫 |** Lệnh lạ, nhập để được trợ giúp! **\`${prefix}help\`**`)
      .setDescription(`Để bắt đầu sử dụng nhập \`${prefix}play {tên nhạc/link}\``)
    )
    //get the command from the collection
    let command = client.commands.get(cmd);
    //if the command does not exist, try to get it by his alias
    if (!command) command = client.commands.get(client.aliases.get(cmd));
    //if the command is now valid
    if (command){
        if (!client.cooldowns.has(command.name)) { //if its not in the cooldown, set it too there
            client.cooldowns.set(command.name, new Discord.Collection());
        }
        const now = Date.now(); //get the current time
        const timestamps = client.cooldowns.get(command.name); //get the timestamp of the last used commands
        const cooldownAmount = (command.cooldown || 1.5) * 1000; //get the cooldownamount of the command, if there is no cooldown there will be automatically 1 sec cooldown, so you cannot spam it^^
        if (timestamps.has(message.author.id)) { //if the user is on cooldown
          const expirationTime = timestamps.get(message.author.id) + cooldownAmount; //get the amount of time he needs to wait until he can run the cmd again
          if (now < expirationTime) { //if he is still on cooldonw
            const timeLeft = (expirationTime - now) / 1000; //get the lefttime
            return message.channel.send(new Discord.MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(ee.footertext,ee.footericon)
              .setTitle(`**🚫 |** Bạn dùng nhanh quá đó, hãy đợi ${timeLeft.toFixed(1)} giây!`)
            ); //send an information message
          }
        }
        timestamps.set(message.author.id, now); //if he is not on cooldown, set it to the cooldown
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount); //set a timeout function with the cooldown, so it gets deleted later on again
      try{
        //try to delete the message of the user who ran the cmd
        try{}catch{}
        //if Command has specific permission return error
        if(command.memberpermissions && !message.member.hasPermission(command.memberpermissions)) {
          return message.channel.send(new Discord.MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle("**🚫 |** Bạn không có quyền để dùng lệnh này")
            .setDescription(`Bạn cần những quyền sau: \`${command.memberpermissions.join("`, ``")}\``)
          ).then(msg=>msg.delete({timeout: 5000}).catch(e=>console.log("Couldn't Delete --> Ignore".gray)));
        }
        //if the Bot has not enough permissions return error
        if(!message.guild.me.hasPermission(Discord.Permissions.FLAGS.CONNECT)){
          return message.channel.send(new Discord.MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle("**🚫 |** Thiếu quyền hạn!")
          .setDescription("**🚫 |** Tôi không có quyền hạn để kết nối!"))
        }
        //run the command with the parameters:  client, message, args, user, text, prefix,
        command.run(client, message, args, message.member, args.join(" "), prefix);
      }catch (e) {
        console.log(String(e.stack).red)
        return message.channel.send(new Discord.MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle("**🚫 |** Có trục trặc kĩ thuật, lệnh: `" + command.name + "`")
          .setDescription(`\`\`\`${e.message}\`\`\``)
        ).then(msg=>msg.delete({timeout: 5000}).catch(e=>console.log("Couldn't Delete --> Ignore".gray)));
      }
    }
    else //if the command is not found send an info msg
    return message.channel.send(new Discord.MessageEmbed()
      .setColor(ee.wrongcolor)
      .setFooter(ee.footertext, ee.footericon)
      .setTitle(`**🚫 |** Lệnh lạ, nhập để được trợ giúp! **\`${prefix}help\`**`)
      .setDescription(`Để bắt đầu sử dụng nhập \`${prefix}play {tên nhạc/link}\``)
    ).then(msg=>msg.delete({timeout: 5000}).catch(e=>console.log("Couldn't Delete --> Ignore".gray)));
  }catch (e){
    return message.channel.send(
    new Discord.MessageEmbed()
    .setColor("RED")
    .setTitle(`**❗️ |** Ôi hỏng rồi | đã xảy ra lỗi!`)
    .setDescription(`\`\`\`${e.stack}\`\`\``)
    )}
}