const { SlashCommandBuilder, EmbedBuilder  } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('status')
        .setDescription('Giver dig status omkring minecraft server!')
        .addStringOption(option => option.setName('spørgsmål').setRequired(true).setDescription('spørgsmålet du vil vide mere om')),
    async execute(interaction, client) {

        const message = await interaction.deferReply({
            fetchReply: true
        });
        const string = interaction.options.getString('spørgsmål');
        const ping = require('minecraft-server-util');
        ping(string, "25565", (error, reponse) =>{
            if(error) throw error

            const stauts = new EmbedBuilder()
                .setColor('#ff0000')
                .setTitle(`Pong! ${reponse.host}`)
                .setTimestamp()
                .setFooter({ text: `Brugt af: ${interaction.user.tag}` , iconURL: interaction.user.displayAvatarURL() });

            interaction.editReply({embeds: [stauts]});


        })
        
        
    }
}