const { readdirSync } = require("fs")

module.exports = (client) => {
    client.handleComponents = async () => {
        const componentsFolders = readdirSync(`./src/Components`)
        for (const folder  of componentsFolders) {
            const componentsFiles = readdirSync(`./src/Components/${folder}`).filter((file) => file.endsWith(".js"));

            const { buttons } = client; 

            switch (folder) {
                case "buttons":

                    for (const file of componentsFiles) {
                        const button = require(`../../Components/${folder}/${file}`);
                        buttons.set(button.data.name, button)
                    }
                    break;

                default:
                    break;

            }
        }

    }
}