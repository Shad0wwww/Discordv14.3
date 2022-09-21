const chalk = require("chalk");

module.exports = {
    data: {
        name: `testmodal`
    },
    async execute(interaction, client) {
        const yfarve = interaction.fields.getTextInputValue('InputFromTest');
	    const nogetomdigselv = interaction.fields.getTextInputValue('InputFromTest2');
        console.log(chalk.green({ yfarve, nogetomdigselv }));
        await interaction.reply({
            content : `Du sagde: ${yfarve} og ${nogetomdigselv}`,
            ephemeral: true 
        })
    }
}