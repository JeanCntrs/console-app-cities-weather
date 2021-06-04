const { readInput, inquirerMenu, pause } = require('./helpers/inquirer');
const Searches = require('./models/searches');
require('colors');

const main = async () => {
    const searches = new Searches();
    let opt;

    do {
        opt = await inquirerMenu();

        switch (opt) {
            case 1:
                const city = await readInput('Ciudad: ');
                await searches.searchCity(city);

                console.log('\nInformación de la ciudad\n'.green);
                break;
        }

        opt !== 0 && await pause();
    } while (opt != 0);
}

main();