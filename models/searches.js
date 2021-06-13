const fs = require('fs');
const axios = require('axios');

class Searches {
    history = [];
    pathDB = './db/database.json';

    constructor() {
        this.readDB();
    }

    get historyCapitalize() {
        return this.history.map(place => {
            let words = place.split(' ');
            words = words.map(word => word[0].toUpperCase() + word.substring(1));

            return words.join(' ');
        });
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

    addHistory(place = '') {
        if (this.history.includes(place.toLowerCase())) return;

        this.history = this.history.splice(0, 5);
        this.history.unshift(place.toLowerCase());

        this.saveDB();
    }

    saveDB() {
        const payload = {
            history: this.history
        };

        fs.writeFileSync(this.pathDB, JSON.stringify(payload));
    }

    readDB() {
        if (!fs.existsSync(this.pathDB)) return;

        const info = fs.readFileSync(this.pathDB, { encoding: 'utf-8' });
        const data = JSON.parse(info);

        this.history = data.history;
    }
}

module.exports = Searches;