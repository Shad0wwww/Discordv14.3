const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField   } = require('discord.js');

const Report = require('../../schemas/report');
const mongoose = require('mongoose');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('report')
        .setDescription('Report en person')
        
        .addUserOption(option => option.setName('person').setRequired(true).setDescription('få information om en person'))
        .addStringOption(option => option.setName('grund').setRequired(true).setDescription('grunden for report')),
    
        async execute(interaction, client) {arguments

        const message = await interaction.deferReply({
            fetchReply: true
        });
      
        const person = interaction.options.getUser('person');
        const string = interaction.options.getString('grund');
        const ping = new EmbedBuilder()
            .setColor('#ff0000')
            .setDescription(`Ingen adgang.`)
            .setTimestamp()
            .setFooter({ text: `Brugt af: ${interaction.user.tag}` , iconURL: interaction.user.displayAvatarURL() });

        const check = new EmbedBuilder()
            .setColor('#ff0000')
            .setDescription(`${person} grund ${string}`)
            .setTimestamp()
            .setFooter({ text: `Brugt af: ${interaction.user.tag}` , iconURL: interaction.user.displayAvatarURL() });

        let reportProfile = await Report({ 
            _id: mongoose.Types.ObjectId(),
            reportName: interaction.user.tag,
            reportID: interaction.user.id,
            reportGrund: string
        });

 
       

        
        console.log(reportProfile)
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) {
            return await interaction.editReply({embeds: [ping], ephemeral: true});
        } else {

            await interaction.editReply({embeds: [check], ephemeral: true});
            await reportProfile.save().catch(console.eror)
        }



        

        
    }
}