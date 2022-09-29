const { SlashCommandBuilder, EmbedBuilder  } = require('discord.js');
const LabyMod = require('node-labymod');
const { getUuid, getUserName, getNameHistory, getPlayerSkin } = require("../../api/mcapi")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mcplayer')
        .setDescription('For information af en mcperson')
        .addStringOption(option => option.setName('mcname').setRequired(true).setDescription('navnet på spilleren')),
        
    async execute(interaction, client) {
        const navn = interaction.options.getString('mcname');
  
        const message = await interaction.deferReply({
            fetchReply: true
        });
        
        let uuid = await getUuid(navn)
        let NameHistory = await getNameHistory(uuid)
        let mcNavn = await getUserName(uuid)
        let nameHistorylenght = NameHistory.length
    
        console.log(nameHistorylenght)

        const labyuser = new EmbedBuilder()
            .setColor('#ff0000')
            .setTitle(`MINCECRAFT INFO | ${mcNavn}`)
            .setThumbnail(await getPlayerSkin(uuid))
            .addFields(
                {name: '**UUID**', value: uuid},
                {name: `**NameHistory ( ${nameHistorylenght} )**`, value: `\`${NameHistory}\``} 
            )
            .setTimestamp()
            .setFooter({ text: `Brugt af: ${interaction.user.tag}` , iconURL: interaction.user.displayAvatarURL() });

        await interaction.editReply({
            embeds: [labyuser],
            ephemeral: true
        });

        
    }
}