const { SlashCommandBuilder, EmbedBuilder  } = require('discord.js');
const LabyMod = require('node-labymod');
const { getUuid, getUsername, getNameHistory } = require("../../api/mcapi")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('uuid')
        .setDescription('For uuid af en person')
        .addStringOption(option => option.setName('mcname').setRequired(true).setDescription('navnet på spilleren')),
        
    async execute(interaction, client) {
        const navn = interaction.options.getString('mcname');
  
        const message = await interaction.deferReply({
            fetchReply: true
        });
        
        let uuid = await getUuid(navn)
       


        const labyuser = new EmbedBuilder()
            .setColor('#ff0000')
            .setTitle(`MC UUID | ${navn}`)
            .setDescription(`\`${uuid}\``)
            .setTimestamp()
            .setFooter({ text: `Brugt af: ${interaction.user.tag}` , iconURL: interaction.user.displayAvatarURL() });

        await interaction.editReply({
            embeds: [labyuser],
            ephemeral: true
        });

        
    }
}