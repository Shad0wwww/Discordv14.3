const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder  } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('knap')
        .setDescription('tilbage med en knap!'),
    async execute(interaction, client) {
        const message = await interaction.deferReply({
            fetchReply: true
        });
        

        const button = new ButtonBuilder()
            .setCustomId('knap')
            .setLabel(`Klik på mig!`)
            .setStyle(ButtonStyle.Primary)


        
        await interaction.editReply({
            components: [new ActionRowBuilder().addComponents(button)]
        });

        
    }
}