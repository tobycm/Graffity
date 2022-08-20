const config = require('../../config/config.json')
module.exports = client => {
  try{
    const stringlength = 69
    console.log("\n")
    console.log(`     ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`.bold.brightGreen)
    console.log(`     ┃ `.bold.brightGreen + " ".repeat(-1+stringlength-` ┃ `.length)+ "┃".bold.brightGreen)
    console.log(`     ┃ `.bold.brightGreen + `online now!`.bold.brightGreen + " ".repeat(-1+stringlength-` ┃ `.length-`online now!`.length)+ "┃".bold.brightGreen)
    console.log(`     ┃ `.bold.brightGreen + ` /--/ ${client.user.tag} /--/ `.bold.brightGreen+ " ".repeat(-1+stringlength-` ┃ `.length-` /--/ ${client.user.tag} /--/ `.length)+ "┃".bold.brightGreen)
    console.log(`     ┃ `.bold.brightGreen + " ".repeat(-1+stringlength-` ┃ `.length)+ "┃".bold.brightGreen)
    console.log(`     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`.bold.brightGreen)
  }catch{ /* */ }

  try{
    // activity case
    setInterval(() => {
        const statuses = [
          `Joakim Karud | g-help`,
          `Still in Beta! | g-help`,
          `${client.guilds.cache.size} sever | g-help`,
        ]
  
        const status = statuses[Math.floor(Math.random() * statuses.length)]
        client.user.setActivity(status, { type: "LISTENING"})
    }, 2000) 
  }catch (e) {
      console.log(String(e.stack).red)
  }
  setTimeout(()=>{
    try{
      // activity case
      setInterval(() => {
          const statuses = [
              `Joakim Karud | g-help`,
              `Still in Beta! | g-help`,
              `${client.guilds.cache.size} sever | g-help`,
          ]
    
          const status = statuses[Math.floor(Math.random() * statuses.length)]
          client.user.setActivity(status, { type: "LISTENING"})
      }, 1300) 
    }catch (e) {
        console.log(String(e.stack).red)
    }
  }, 10*60*1000)
}