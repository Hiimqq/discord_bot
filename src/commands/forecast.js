const { SlashCommandBuilder } = require('discord.js');

const data = new SlashCommandBuilder()
    .setName('forecast')
    .setDescription('Replies with a weather forecast.')
    .addStringOption((option) => {
        return option
            .setName('location')
            .setDescription('The location can be a city, zip or postal code, or lat/long.')
            .setRequired(true);
    })
    .addStringOption((option) => {
        return option
            .setName('units')
            .setDescription('The unit system of the results: "metric" or "imperial".')
            .setRequired(false)
            .addChoices(
                { name: 'Metric', value: 'metric' },
                { name: 'Imperial', value: 'imperial' },
            );
    });

async function execute(interaction) {
    const location = interaction.options.getString('location');
    const units = interaction.options.getString('units');

    await interaction.reply('The weather is nice');
}

module.exports = {
    data,
    execute,
};