require('dotenv').config();
const { Client, Collection, GatewayIntentBits, Partials, EmbedBuilder, Invite, InviteTargetType, InviteGuild } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildInvites, GatewayIntentBits.DirectMessageTyping], partials: [Partials.Channel] });
const { token, databaseToken } = process.env;
const fs = require('fs');
const { guildId } = require("./config/config.json")

const { connect } = require('mongoose');

client.commands = new Collection();
client.buttons = new Collection();
client.modals = new Collection();
client.selectMenus = new Collection();
client.commandArray = [];

const functionFolders = fs.readdirSync('./src/functions');
for(const folder of functionFolders) {
  const functionfiles = fs
    .readdirSync(`./src/functions/${folder}`)
    .filter((file)=>file.endsWith(".js"));
  for(const file of functionfiles)
    require(`./functions/${folder}/${file}`)(client);

}

client.HandleEvents();
client.HandleCommands();
client.handleComponents();
client.login(token);

(async () => {
  await connect(databaseToken).catch(console.error);
})();


client.on('guildMemberAdd', async (member) => {
    if (member.guild.id !== guildId) return
    console.log(member.guild.name)
    let channel = client.channels.cache.get("1016238614625136700")
    
    const joinEmbed = new EmbedBuilder()
        .setColor('#008937')
        .setTitle('**FAAE 2022 / 2023 **')
        //.setDescription('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
        .setThumbnail(member.displayAvatarURL({ format: 'png' }))
        .addFields(
        { name: "**Velkommen**", value: `Velkommen <@${member.user.id}>!` },
        )
        .setTimestamp()
    channel.send({ embeds: [joinEmbed] });

    let logchannel = client.channels.cache.get("1016271790642827274")
   
    logchannel.send(`user: ${member.user.id} DiscordName: ${member.user.tag}`)
  
});


