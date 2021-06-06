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

    async searchCity(city = '') {
        // console.log('city', city);

        try {
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json`,
                params: this.mapboxParams
            });

            const response = await instance.get();
            console.log(response.data, 'response');
            return [];
        } catch (error) {
            console.log(error);
            return [];
        }

    }
}

module.exports = Searches;