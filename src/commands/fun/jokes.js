const { SlashCommandBuilder, EmbedBuilder  } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('joke')
        .setDescription('Det er en joke command!')
        .addStringOption(option =>
            option.setName('category')
                .setDescription('joke category')
                .setRequired(true)
                .addChoices(
                    { name: 'Dark', value: 'Dark' },
                    { name: 'Any', value: 'any' },
                    { name: 'Programming', value: 'programming' },
                )),
    async execute(interaction, client) {
        const joke = interaction.options.getString('category');
        console.log(joke)
        const url = await fetch("https://v2.jokeapi.dev/joke/" + joke);
        const random = await url.json();
        console.log(random)

        const message = await interaction.deferReply({
            fetchReply: true
        });

        const ping = new EmbedBuilder()
            .setColor('#ff0000')
            .setTitle(`Random Joke | ${random.category}`)
            .addFields(
                {name: 'Joke', value: random.setup},
                {name: 'Svar', value: random.delivery},
            )
            .setTimestamp()
            .setFooter({ text: `Brugt af: ${interaction.user.tag}` , iconURL: interaction.user.displayAvatarURL() });

        await interaction.editReply({
            embeds: [ping]
        });

        
    }
}