const {
    SlashCommandBuilder,
    EmbedBuilder,
} = require('discord.js');

const { fetchForecast } = require('../requests/forecast');

const data = new SlashCommandBuilder()
    .setName('astro')
    .setDescription('Replies with the moonrise/moonset for a particular day.')
    .addStringOption((option) => {
        return option
            .setName('location')
            .setDescription('The location can be a city, zip or postal code, or lat/long.')
            .setRequired(true);
    });

async function execute(interaction) {
    await interaction.deferReply();

    const location = interaction.options.getString('location');

    try {
        const { weatherData, locationName } = await fetchForecast(location);

        const embed = new EmbedBuilder()
            .setColor(0x3f704d)
            .setTitle(`Astronomical forecast for ${locationName}...`)
            .setTimestamp()
            .setFooter({
                text: 'Forecast from weatherapi.com',
            });

        for (const day of weatherData) {
            embed.addFields({
                name: day.date,
                value: `Sunrise: ${day.sunriseTime}\nSunset: ${day.sunsetTime}\nMoonrise: ${day.moonriseTime}\nMoonset: ${day.moonsetTime}`
            });
        }

        await interaction.editReply({
            embeds: [embed],
        });
    } catch (error) {
        await interaction.editReply(error);
    }

}

module.exports = {
    data,
    execute,
};