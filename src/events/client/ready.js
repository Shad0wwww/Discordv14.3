const chalk = require('chalk');

module.exports = {
    name: "ready",
    once: true,
    async execute(client) {
        console.log(chalk.green.bold(`${client.user.tag} is online!`));
        client.user.setPresence({ activities: [{ name: 'Just a test bot' }], status: 'idle' });
    }

}