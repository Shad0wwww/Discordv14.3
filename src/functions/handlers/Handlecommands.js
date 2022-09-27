const fs = require("fs");
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { guildId, clientId } = require('../../config/config.json');
module.exports = (client) => {
    client.HandleCommands = async () => {
        const commandFolders = fs.readdirSync('./src/commands');
        for (const folder of commandFolders) {
            const commandsFiles = fs
                .readdirSync(`./src/commands/${folder}`)
                .filter((file) => file.endsWith(".js"));
            const { commands, commandArray } = client;
            for (const file of commandsFiles) {
                const command = require(`../../commands/${folder}/${file}`);
                commands.set(command.data.name, command);
                commandArray.push(command.data.toJSON());
                console.log(`Command: ${command.data.name} has been loaded`);
            }
        }
        const rest = new REST({ version: '10' }).setToken(process.env.token);
        try {
            const { commands, commandArray } = client;
            console.log(`Started refreshing ${commands.length} application (/) commands.`);

            await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
                body: client.commandArray,
            });
            console.log(`Successfully reloaded application (/) commands.`);
        } catch (error) {
            console.log(error);
        }
    };
}