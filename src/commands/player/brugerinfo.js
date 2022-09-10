const { SlashCommandBuilder, EmbedBuilder  } = require('discord.js');
const moment = require('moment');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('brugerinfo')
        .setDescription('For information om dig selv')
        
        .addUserOption(option => option.setName('person').setDescription('få information om en person')),
    async execute(interaction, client) {

        const message = await interaction.deferReply({
            fetchReply: true
        });
      
        const user = interaction.options.getUser('person');
        let createdAt = moment(user.createdAt);
        let dateFormated = createdAt.format('DD/MM/YYYY HH:MM:SS')+'( '+ createdAt.fromNow() +' )';

        if (user) {
            const ping = new EmbedBuilder()
                .setColor('#ff0000')
                .setTitle(`${user.tag}`)
                .setThumbnail(user.displayAvatarURL({ format: 'png' }))
                .setDescription(`**Brugerinfo**\n> **ID: ** ${user.id}\n> **Oprettet: ** ${dateFormated}\n> `)

                .setTimestamp()
                .setFooter({ text: `Brugt af: ${interaction.user.tag}` , iconURL: interaction.user.displayAvatarURL() });
            
                await interaction.editReply({
                embeds: [ping]
            });
        } else {
            const ping1 = new EmbedBuilder()
                .setColor('#ff0000')
                .setTitle(`${interaction.user.tag}`)
                .setTimestamp()
                .setFooter({ text: `Brugt af: ${interaction.user.tag}` , iconURL: interaction.user.displayAvatarURL() });
            await interaction.editReply({
                embeds: [ping1]
            });
        }
        

        
    }
}