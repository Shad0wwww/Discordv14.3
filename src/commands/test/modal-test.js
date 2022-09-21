const { SlashCommandBuilder, EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder  } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('modal')
        .setDescription('viser dig modal!'),
    async execute(interaction, client) {
        
        const modal = new ModalBuilder()
            .setCustomId(`testmodal`)
            .setTitle(`Skriv noget fedt`)
            

        const textInput = new TextInputBuilder()
            .setCustomId('InputFromTest')
            .setLabel(`Din y farve`)
            .setRequired(true)
            .setStyle(TextInputStyle.Short)
        
        const hej = new TextInputBuilder()
            .setCustomId('InputFromTest2')
            .setLabel(`skriv noget om dig selv.`)
            .setRequired(true)
            .setStyle(TextInputStyle.Short)

        const firstActionRow = new ActionRowBuilder().addComponents(textInput);
        const secondActionRow = new ActionRowBuilder().addComponents(hej);

        modal.addComponents(firstActionRow, secondActionRow)
        
        await interaction.showModal(modal)

        
    },
};