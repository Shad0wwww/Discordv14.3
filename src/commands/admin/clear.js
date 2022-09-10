const { SlashCommandBuilder, EmbedBuilder  } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Clear the chat.')
        .addIntegerOption((option) => option
            .setMaxValue(100)
            .setMinValue(1)
            .setName('antal')
            .setDescription(`Antal beskeder du vil slette — Range: 1 til 100.`)
            .setRequired(true)),

    async execute(interaction, client) {
      
       


        const message = await interaction.deferReply({
            fetchReply: true
        });

        if(!interaction.member.permissions.has("ADMINISTRATOR") && !interaction.member.permissions.has(kickPermissions)){
            const embed4 = new MessageEmbed()
                .setColor('#ff0000')
                .setTitle('Clear Chat')
                .setDescription('Du har ikke adgang!')
                .setTimestamp()
            return await interaction.editReply({ embeds: [embed4] });

        } else {
            try {

            
                const real_integer = interaction.options.getInteger('antal');
                let integer = interaction.options.getInteger('antal');


                if(integer !== 100) { integer = integer + 1 }

                await interaction.channel.bulkDelete(integer, true);
                await interaction.editReply({ content: `🤌 Slettede \`${real_integer} beskeder\`!` })
                    
                setTimeout(() => { interaction.deleteReply(); }, 5000);
            } catch(err) {
                console.log(err)
            }
        }
        
    }
}