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
        const options = {
            timeout: 1000 * 5, // timeout in milliseconds
            enableSRV: true // SRV record lookup
        };

        util.status(server, portserver, options).then((response) => {
            console.log(response)
            console.log("errorrrrrr " + response.srvRecord.host)
          

            const host = new EmbedBuilder()
                .setColor('#ff0000')
                .setTitle(`Mc Server Status`)
                .addFields(
                    {name: 'Server Navn', value: server + " " + portserver},
                    {name: 'Server Versions', value: response.version.name},
                    {name: 'Motd', value: response.motd.clean},
                    {name: 'Online Players og max Players', value: response.players.online + " / " + response.players.max }
                    
                    
                )
                //.setThumbnail(response.favicon)
                .setTimestamp()
                .setFooter({ text: `Brugt af: ${interaction.user.tag}` , iconURL: interaction.user.displayAvatarURL() });
            interaction.editReply({
                embeds: [host]
            });  

                
                                         
           
            

        })
        .catch ((error) => console.error(error));
        
        
        
    }
}