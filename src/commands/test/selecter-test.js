const { SlashCommandBuilder, EmbedBuilder, SelectMenuBuilder, SelectMenuOptionBuilder, ActionRowBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('selecter')
        .setDescription('Sender dig en selecter menu tilbage'),
    async execute(interaction, client) {

        const message = await interaction.deferReply({
            fetchReply: true
        });
        
        const menu = new SelectMenuBuilder()
            .setCustomId(`selecter-menu`)
            .setMinValues(1)
            .setMaxValues(1)
            .addOptions(
                new SelectMenuOptionBuilder({
                    label: `option #1`,
                    value: `Hejsa`
                }),
                new SelectMenuOptionBuilder({
                    label: `option #22`,
                    value: `Hejsa2`
                })
            );


        await interaction.editReply({
            components: [new ActionRowBuilder().addComponents(menu)],
            content: 'Pong!',
        });


    }
}