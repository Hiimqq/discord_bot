const { 
    SlashCommandBuilder,
    EmbedBuilder,
} = require('discord.js');

const { fetchForecast } = require('../requests/forecast');

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
    await interaction.deferReply();

    const location = interaction.options.getString('location');
    const units = interaction.options.getString('units') || 'imperial';
    const isImperial = units === 'imperial';

    const { weatherData, locationName } = await fetchForecast(location);

    const embed = new EmbedBuilder()
        .setColor(0x3f704d);
        .setTitle(`Weather forecast for ${locationName}...`);
        .setDescription(`Using the ${units} system.`);
        .setTimestamp();
        .setFooter({
            text: 'Forecast from weatherapi.com' ,
        });
    for (const day of weatherData) {
        const temperatureMin = isImperial ? day.temperatureMinF : day.temperatureMinC
        const temperatureMax = isImperial ? day.temperatureMaxF : day.temperatureMaxC

        embed.addFields({
            name: day.date,
            value: `❄️ Low: ${temperatureMin}° ❄️, 🔥 High ${temperatureMax}° 🔥`
        });
    }

    await interaction.editReply({
        embeds: [embed]
    });
}

module.exports = {
    data,
    execute,
};