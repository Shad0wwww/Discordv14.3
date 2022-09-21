const { SlashCommandBuilder, EmbedBuilder  } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Pong!'),
    async execute(interaction, client) {

        const message = await interaction.deferReply({
            fetchReply: true
        });

        const ping = new EmbedBuilder()
            .setColor('#ff0000')
            .setTitle(`Pong! Latency is ${message.createdTimestamp - interaction.createdTimestamp}ms. \nAPI Latency is ${Math.round(client.ws.ping)}ms.`)
            .setTimestamp()
            .setFooter({ text: `Brugt af: ${interaction.user.tag}` , iconURL: interaction.user.displayAvatarURL() });

        await interaction.editReply({
            embeds: [ping]
        });

        
    }
}