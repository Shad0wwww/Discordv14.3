const { SlashCommandBuilder, EmbedBuilder  } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Clear the chat.')
        .addIntegerOption((option) => option
            .setMaxValue(100)
            .setMinValue(1)
            .setName('antal')
            .setDescription(`Antal beskeder du vil slette — Range: 1 til 100.`)
            .setRequired(true)),

    async execute(interaction, client) {
        const number = interaction.options.getInteger('antal');
        let integer = interaction.options.getInteger('amount');


        const message = await interaction.deferReply({
            fetchReply: true
        });

        const ping = new EmbedBuilder()
            .setColor('#ff0000')
            .setTitle(`Clear ${number} messages.`)
            .setTimestamp()


        if(integer !== 100) { integer = integer + 1 }


        await interaction.editReply({
            
            


            embeds: [ping]
        });

        
    }
}