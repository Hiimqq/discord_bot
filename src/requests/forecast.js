const axios = require('axios');

const URL =  'http://api.weatherapi.com/v1/forecast.json';
const FORECAST_DAYS = 3;

async function fetchForecast(location) {
    await axios ({
        url: URL,
        method: 'get',
        params: {
            q: location,
            days: FORECAST_DAYS,
            key: process.env.WEATHER_API_KEY,
        },
        responseType: 'json',
    })
        .then((reponse) => {
            const city = response.data.location.name;
            const country = response.data.location.country;
            const region = response.data.location.region;
            const locationName = `${city}, ${country}, ${region}`;

            const weatherData = response.data.forecast.forecastday.map((forecastDay) => {
                return {
                    date: forecastDay.date,

                    temperatureMinC: forecastDay.day.mintemp_c,
                    temperatureMaxC: forecastDay.day.maxtemp_c,
                    temperatureMinF: forecastDay.day.mintemp_f,
                    temperatureMaxF: forecastDay.day.maxtemp_f,
                };
            });
            return {
                locationName,
                weatherData,
            };
        })
        .catch((error) => {
            console.log(error);
        });
        
}

module.exports = {
    fetchForecast,
};