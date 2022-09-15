const chalk = require('chalk');

module.exports = {
    name: 'error',
    async execute(client, error) {
        console.log(chalk.red.bold(error));
        
    }

}   