const inquirer = require('inquirer');
require('colors');

const questions = [
    {
        type: 'list',
        name: 'option',
        message: '¿Qué desea hacer?',
        choices: [
            {
                value: 1,
                name: `${'1.'.green} Buscar ciudad`
            },
            {
                value: 2,
                name: `${'2.'.green} Historial`
            },
            {
                value: 0,
                name: `${'0.'.green} Salir`
            }
        ]
    }
];

const inquirerMenu = async () => {
    console.clear();
    console.log('==========================='.green);
    console.log('   Seleccione una opción   '.white);
    console.log('===========================\n'.green);

    const { option } = await inquirer.prompt(questions);

    return option;
}

const pause = async () => {
    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${'enter'.green} para continuar`
        }
    ];
    console.log('\n');
    await inquirer.prompt(question);
}

const readInput = async (message) => {
    const question = [
        {
            type: 'input',
            name: 'description',
            message,
            validate(value) {
                if (value.length === 0) {
                    return 'Por favor, ingrese un valor';
                }

                return true;
            }
        }
    ];

    const { description } = await inquirer.prompt(question);

    return description;
}

const listPlaces = async (places = []) => {
    const choices = places.map((place, index) => {
        const number = `${index + 1}`.green;

        return {
            value: place.id,
            name: `${number} ${place.name}`
        }
    });

    choices.unshift({
        value: '0',
        name: '0'.green + ' Cancelar'
    });

    const questions = [
        {
            type: 'list',
            name: 'id',
            message: 'Seleccione lugar:',
            choices
        }
    ];

    const { id } = await inquirer.prompt(questions);

    return id;
}

const confirm = async message => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const { ok } = await inquirer.prompt(question);

    return ok;
}

const showChecklist = async (tasks = []) => {
    const choices = tasks.map((task, index) => {
        const number = `${index + 1}`.green;

        return {
            value: task.id,
            name: `${number} ${task.description}`,
            checked: task.completedAt ? true : false
        }
    });

    const question = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione',
            choices
        }
    ];

    const { ids } = await inquirer.prompt(question);

    return ids;
}


module.exports = {
    inquirerMenu,
    pause,
    readInput,
    listPlaces,
    confirm,
    showChecklist
}