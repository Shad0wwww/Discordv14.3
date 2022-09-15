const { SlashCommandBuilder, EmbedBuilder  } = require('discord.js');
const { ballAnswers } = require('../../config/8ball.json')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('8ball')
        .setDescription('spor din fremtid 🎱')
        .addStringOption(option => option.setName('spørgsmål').setRequired(true).setDescription('spørgsmålet du vil vide mere om')),
    async execute(interaction, client) {
        const string = interaction.options.getString('spørgsmål');
        const message = await interaction.deferReply({
            fetchReply: true
        });

        const answer = ballAnswers[Math.floor(Math.random() * ballAnswers.length)];

        const ping = new EmbedBuilder()
            .setColor('#90EE90')
            .setDescription(`**Spørgsmål**:` + ` \`${string}\`` + "\n" + `**Svar**: \`${answer}\``)
            .setTimestamp()
            .setFooter({ text: `Brugt af: ${interaction.user.tag}` , iconURL: interaction.user.displayAvatarURL() });

        await interaction.editReply({
            embeds: [ping]
        });

        
    }
}