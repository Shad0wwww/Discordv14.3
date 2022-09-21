const { ModalSubmitFields } = require("discord.js");
const { readdirSync } = require("fs")

module.exports = (client) => {
    client.handleComponents = async () => {
        const componentsFolders = readdirSync(`./src/Components`)
        for (const folder  of componentsFolders) {
            const componentsFiles = readdirSync(`./src/Components/${folder}`).filter((file) => file.endsWith(".js"));

            const { buttons, modals } = client; 

            switch (folder) {
                case "buttons":

                    for (const file of componentsFiles) {
                        const button = require(`../../Components/${folder}/${file}`);
                        buttons.set(button.data.name, button)
                    }
                    break;
                case "modals":
                    for (const file of componentsFiles) {
                        const modal = require(`../../Components/${folder}/${file}`);
                        modals.set(modal.data.name, modal)
                    } 
                default:
                    break;

            }
        }

    }
}