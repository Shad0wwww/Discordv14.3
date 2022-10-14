const { SlashCommandBuilder, EmbedBuilder  } = require('discord.js');
const { getIpInfo } = require('../../api/ip-tracker')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ip')
        .setDescription('Giver dig status omkring minecraft server!')
        .addStringOption(option => option.setName('ip').setRequired(true).setDescription('ip')),
        
    async execute(interaction, client) {

        const message = await interaction.deferReply({
            fetchReply: true
        });
        const ip = interaction.options.getString('ip');
        getIpInfo(ip)

        
        const host = new EmbedBuilder()
            .setColor('#ff0000')
            .setTitle(`Mc Server Status`)
            // .addFields(
            //     {name: 'Server Navn', value: server + " " + portserver},
            //     {name: 'Server Versions', value: response.version.name},
            //     {name: 'Motd', value: response.motd.clean},
            //     {name: 'Online Players og max Players', value: response.players.online + " / " + response.players.max }
                
                
            // )
            //.setThumbnail(response.favicon)
            .setTimestamp()
            .setFooter({ text: `Brugt af: ${interaction.user.tag}` , iconURL: interaction.user.displayAvatarURL() });
        interaction.editReply({
            embeds: [host]
        });  

                
                                         
           
            

        
        
        

        
        
        
        
    }
}