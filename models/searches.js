const axios = require('axios');

class Searches {
    history = ['Cabildo', 'San Felipe', 'Viña del Mar', 'Santiago'];

    constructor() {

    }

    get mapboxParams() {
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
        }
    }

    get openWeatherParams() {
        return {
            appid: process.env.OPEN_WEATHER_KEY,
            units: 'metric',
            lang: 'es'
        }
    }

    async searchCity(city = '') {
        try {
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json`,
                params: this.mapboxParams
            });
            const response = await instance.get();

            return response.data.features.map(place => ({
                id: place.id,
                name: place.place_name,
                lon: place.center[0],
                lat: place.center[1]
            }));
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    async searchWeather(lat, lon) {
        try {
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: {
                    ...this.openWeatherParams,
                    lat,
                    lon
                }
            });
            const response = await instance.get();
            const { weather, main } = response.data;

            return {
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp
            }
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = Searches;