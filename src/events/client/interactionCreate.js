const chalk = require('chalk');


module.exports = {
    name: "interactionCreate",
    async execute(interaction, client) {
 
        if (interaction.isChatInputCommand()) {
            const { commands } = client;
            const { commandName } = interaction;
            const command = commands.get(commandName);
            if (!command) return interaction.reply("Command not found!");

            try {
                await command.execute(interaction, client);
            } catch (error) {
                console.log("FEJl ", error);
                await interaction.reply({
                    content: "Something went wrong!",
                    ephemeral: true
                });
            }
        } else if (interaction.isButton()){
            
            const { buttons } = client;
            const { customId } = interaction;
            const button = buttons.get(customId);

            if (!button) return new Error('There is no code for the button.')
            try {   
                await button.execute(interaction, client)

            } catch (err) {
                console.error(err)
            }
        } else if (interaction.isSelectMenu()) {
        
            const { selectMenus } = client;
            const { customId } = interaction;
            const menu = selectMenus.get(customId);
            if (!menu) return new Error('There is no code for the Selecter.')
            try {
                await menu.execute(interaction, client)
            } catch (err) {
                console.error(err)
            }


        } else if (interaction.isModalSubmit())  {
            const { modals } = client;
            const { customId } = interaction;
            const modal = modals.get(customId);


            if (!modal) return new Error('There is no code for the modal.')
            try {   
                await modal.execute(interaction, client)

            } catch (err) {
                console.error(err)
            }
        
        } else  {
            new Error("Der er fejl i interactionCreate.")
            console.log(`${interaction.author.tag} said: ${interaction.content}`);
        }
    },

};