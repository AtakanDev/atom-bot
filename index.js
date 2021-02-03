const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const prefix = '/'
const { MessageEmbed } = require('discord.js');
const SteamAPI = require('steamapi');
const config = require("./config.json") //define Config
const steam = new SteamAPI('/////YOURID/////');

client.once('ready', () => {
    console.log('-----------------------------------------');
    console.log('= * =   Atom Bot is now activated!!   * + *');
    console.log('-----------------------------------------');
})


client.on('message', message => {
 if(message.content.startsWith('/ping'))
 {
    message.channel.send(`🏓Latency is ${ message.createdTimestamp - Date.now()}ms. API Latency is ${Math.round(client.ws.ping)}ms`);
 }
 if(message.channel.id == '784767260039315467') 
 {
     if(message.content.startsWith('/destek'))
     {
          return message.channel.send(`Merhaba, Bir sıkıntı yaşıyor olmalısınız <@&782627355494580224> çağrıldı en kısa sürede destek gelecektir bu esnada  lütfen destek bekleme odasına geçiniz.`);
     }
  }
     if(message.channel.name == 'yetkili-işlem')
     {
      if(message.content.startsWith('/dedike'))
      {
        const args =  message.content.slice(prefix.length).trim().split(',');
        const command = args.shift().toLowerCase();
        let isim = args[0];
        let sebep = args[1];
        let tür = args[2];
        let Süre = args[3];
        let ID = args[4];
        let filetxtws = ID + '.txt';
        var currentPath = process.cwd();
        console.log(currentPath);
        if(fs.existsSync(currentPath + `/${filetxtws}`))
        {console.log('yes')}
        else{
          fs.writeFile(filetxtws,`${isim},${sebep},${tür},${Süre},${ID}`, function(err){
          if(err) console.log(err)
          console.log('yes, ',filetxtws)
          })
      }
      const callEmbed = new MessageEmbed()
          .setColor('#FF5733')
          .setThumbnail("https://cdn.discordapp.com/icons/782344344111284234/49f4ee89a9ca733085ede0f1102d033c.webp?size=1024")
          .addField(`Orospu çocukları götünüzü yağmalıyorlar galiba dur yardım edem`, `Syntax'e uygun şikayetlerinizi yazınız!`)
          .addFields(
            { name: `İsim?`, value: `${isim}`, inline: true },
            { name: `Sebep?`, value: `${sebep}`, inline: true },
            { name: `Tür?`, value: `${tür}`, inline: true },
            { name: `Süre?`, value: `${Süre}`, inline: true },
            { name: `SteamID?`, value: `${ID}`, inline: true })
          .setFooter(`Umarım iyi gün geçirirsiniz, iyi oyunlar`)
          .setTitle('Şikayet Listeleme!');
          message.delete({ timeout: 1 }) 
          if (!args[0]) return message.channel.send("yARRa, DoĞrU DüZgÜn YaZ AmInA kOdUm..");
          return message.channel.send(callEmbed); 
      }
    }
      if(message.content.startsWith('/logaction'))
      {
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();
        let id = args.slice(0).join(" ");
        let textfile = `${id}.txt`;
        var encryptedstring;
        fs.readFile(textfile, (err, data) => {
          if (err) console.log(err);
          var str = data.toString();
          encryptedstring = str.split(',');
          let isim = encryptedstring[0];
          let tür = encryptedstring[2];
          let ID = encryptedstring[4];
          const callEmbed = new MessageEmbed()
              .setColor('#A9A9A9')
              .setThumbnail("https://cdn.discordapp.com/icons/782344344111284234/49f4ee89a9ca733085ede0f1102d033c.webp?size=1024")
              .addField(`Kimler Orospu Çocukluğu yaptı görmek istiyorsun demek buyur.`, `Syntax'e uygun şikayetlerinizi yazınız!`)
              .addFields(
                { name: `İsim?`, value: `${isim}`, inline: true },
                { name: `Tür?`, value: `${tür}`, inline: true },
                { name: `SteamID?`, value: `${ID}`, inline: true })
              .setFooter(`Umarım iyi gün geçirirsiniz, iyi oyunlar`)
              .setTitle('Şikayet Listeleme!');
              message.delete({ timeout: 1 }) 
              if (!args[0]) return message.channel.send("I can't decide");
              return message.channel.send(callEmbed); 
        });
      }
      if(message.content.startsWith('/steamid'))
      {
        const args =  message.content.slice(prefix.length).trim().split(' ');
        const command = args.shift().toLowerCase();
        var STEAMHTTPS = args[0];
        steam.resolve(`${STEAMHTTPS}`).then(id =>{
          const STEAMIDEmbed = new MessageEmbed()
          .setColor('#A9A9A9')
          .setThumbnail("https://cdn.discordapp.com/icons/782344344111284234/49f4ee89a9ca733085ede0f1102d033c.webp?size=1024")
          .addField(`Gizliye almış Orospu Çocuğu, ama olsun ATOM yardımında.`, `Syntax'e uygun yazınız!`)
          .addFields(
            { name: `SteamID?`, value: `${id}`, inline: true })
          .setFooter(`Umarım iyi gün geçirirsiniz, iyi oyunlar`)
          .setTitle('STEAMID Sorgulama!');
          message.channel.send(STEAMIDEmbed); 
        });
      }
})









client.on('voiceStateUpdate', async (oldState, newState) => {
  try {
      if (newState.channel.id === config.voicechannel) { // if its the channel
          if (newState.channel.members.size > 2) return; //if there are more then 2 members return
          if (newState.member.id === client.user.id) return; // if the member is the Bot return
          if (newState.member.user.bot) return //if its a Bot return
          radioexecuteadmin(); //call the function
      }
  }
  catch {
  }
});
//function to execute the Bot
async function radioexecuteadmin() {
  const voiceChannel = client.guilds.cache.get(config.guildid).channels.cache.get(config.voicechannel); //define the Voice Channel
 try{
      await voiceChannel.leave(); // leave the channel
      await delay(300); // wait 300ms to provent a bug
 }catch{
 }
 
  var connection = await voiceChannel.join();//join the channel and
  await connection.voice.setSelfDeaf(true); await connection.voice.setDeaf(true); //selfdeaf
  const dispatcher = connection.play('./1.mp3'); //pick the audiofile sample is in the folder
  dispatcher.on("end", end => { radioexecuteadmin() });
}
//delay function
function delay(delayInms) {
  return new Promise(resolve => {
      setTimeout(() => {
          resolve(2);
      }, delayInms);
  });
}
client.login("/////YOURID/////");