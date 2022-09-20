const { SlashCommandBuilder, EmbedBuilder  } = require('discord.js');
const fetch = require('node-fetch');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('meme')
        .setDescription('Sender dig en meme!'),
    async execute(interaction, client) {
        const url = await fetch("https://www.reddit.com/r/memes/random/.json");
        const random = await url.json();

        const message = await interaction.deferReply({
            fetchReply: true
        });

        const ping = new EmbedBuilder()
            .setColor('#ff0000')
            .setTitle(`Random Meme | ${random[0].data.children[0].data.title}`)
            .setURL(random[0].data.children[0].data.url)
            .setImage(random[0].data.children[0].data.url)
            .setTimestamp()
            .setFooter({ text: `Brugt af: ${interaction.user.tag}` , iconURL: interaction.user.displayAvatarURL() });

        await interaction.editReply({
            embeds: [ping]
        });

        
    }
}