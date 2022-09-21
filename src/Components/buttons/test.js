module.exports = {
    data: {
        name: `knap`
    },
    async execute(interaction, client) {
        await interaction.reply({
            content : `Hejsa`
        })
    }
}