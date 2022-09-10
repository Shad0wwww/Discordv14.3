const chalk = require('chalk');

module.exports = {
    name: "Disconnected",
    execute() {
        console.log(chalk.red(`[DataBase Status]: Disconnected.`));
        
    },
};