const axios = require('axios');

class Searches {
    history = ['Cabildo', 'San Felipe', 'Viña del Mar', 'Santiago'];

    constructor() {

    }

    async searchCity(city = '') {
        // console.log('city', city);

        try {
            const response = await axios.get('https://reqres.in/api/users?page=2');
            console.log(response.data, 'response');
            return [];
        } catch (error) {
            console.log(error);
            return [];
        }

    }
}

module.exports = Searches;