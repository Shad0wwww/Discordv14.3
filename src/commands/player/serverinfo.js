const { SlashCommandBuilder, EmbedBuilder  } = require('discord.js');
const Guild = require('../../schemas/guild');
const mongoose = require('mongoose');
const { guildtext, guildidtext } = require('../../config/embeds.json')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('serverinfo')
        .setDescription('sender information om serveren!'),
    async execute(interaction, client) {
        let owner = await interaction.guild.fetchOwner();
        let ownertag = owner.user.tag;
        const moment = require('moment');

        // and then use this to format time
        let createdAt = moment(interaction.guild.createdAt);
        let dateFormated = createdAt.format('DD/MM/YYYY HH:MM:SS')+'( '+ createdAt.fromNow() +' )';



        console.log(owner + ownertag)
        let guildProfile = await Guild.findOne({ guildId: interaction.guild.id })
        if (!guildProfile) {
            guildProfile = await new Guild({
                _id: mongoose.Types.ObjectId(), 
                guildId: interaction.guild.id,
                guildName: interaction.guild.name,
                guildIcon: interaction.guild.iconURL() ? interaction.guild.iconURL() : "None",
                guildOwner: `OwnerId: ${owner} OwnerTag: ${ownertag}`,
                guildcreated: dateFormated
            })
            await guildProfile.save().catch(console.eror)

        }
        const message = await interaction.deferReply({
            fetchReply: true
        });
        
        console.log(guildProfile)
        const ping = new EmbedBuilder()
        
            .setColor('#ff0000')
            
            .addFields(
                { name: `${guildtext}`, value: `${guildProfile.guildName}` },
                { name: `${guildidtext}`, value: `${guildProfile.guildId}`, inline: true },
                { name: `Guild icon`, value: `${guildProfile.guildIcon}`},
                { name: `Guild owner`, value: `${guildProfile.guildOwner}`, inline: true },
                { name: `Guild created`, value: `${guildProfile.guildcreated}` },
                
            )
            .setTimestamp()
            .setFooter({ text: `Brugt af: ${interaction.user.tag}` , iconURL: interaction.user.displayAvatarURL() });
            


        await interaction.editReply({
            embeds: [ping],
            ephemeral: true,
        });

        
    }
}