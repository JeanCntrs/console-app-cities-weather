const { readInput, inquirerMenu, pause, listPlaces } = require('./helpers/inquirer');
const Searches = require('./models/searches');
require('dotenv').config();
require('colors');

const main = async () => {
    const searches = new Searches();
    let opt;

    do {
        opt = await inquirerMenu();

        switch (opt) {
            case 1:
                const city = await readInput('Ciudad: ');
                const places = await searches.searchCity(city);
                const id = await listPlaces(places);
                if (id === '0') continue;
                const selectedPlace = places.find(place => place.id === id);
                searches.addHistory(selectedPlace.name)
                const weather = await searches.searchWeather(selectedPlace.lat, selectedPlace.lon);

                console.clear();
                console.log('\nInformación de la ciudad\n'.green);
                console.log('Ciudad:', selectedPlace.name.green);
                console.log('Lat:', selectedPlace.lat);
                console.log('Lon:', selectedPlace.lon);
                console.log('Temperatura:', weather.temp);
                console.log('Mínima:', weather.min);
                console.log('Máxima:', weather.max);
                console.log('Como está el clima:', weather.desc.green);
                break;

            case 2:
                searches.history.forEach((place, index) => {
                    const number = `${index + 1}`.green;
                    console.log(`${number} ${place}`);
                });
                break;
        }

        opt !== 0 && await pause();
    } while (opt != 0);
}

main();