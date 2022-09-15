
const chalk = require('chalk');

module.exports = {
    name: 'rateLimitInfo',
    async execute(client, rateLimitInfo) {
        console.log("Botten bliver ratelimited ligenu!")
        console.log(chalk.red.bold(rateLimitInfo))
    }
}