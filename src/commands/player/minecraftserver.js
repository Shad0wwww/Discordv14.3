const { SlashCommandBuilder, EmbedBuilder  } = require('discord.js');
const util = require('minecraft-server-util');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('status')
        .setDescription('Giver dig status omkring minecraft server!')
        .addStringOption(option => option.setName('server').setRequired(true).setDescription('Server navn'))
        .addNumberOption((option) => option
            .setName('port')
            .setDescription(`port på serveren`)
            .setRequired(true)),
        async execute(interaction, client) {

        const message = await interaction.deferReply({
            fetchReply: true
        });
        const server = interaction.options.getString('server');
        const portserver = interaction.options.getNumber('port');
        const portserver1 = 25565
        util.status(server, {port: parseInt(portserver1)}).then((response) => {
            console.log(response)
            console.log(response.host)
        })
        
        
        
    }
}