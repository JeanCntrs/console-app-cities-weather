const { readInput } = require('./helpers/inquirer');

const main = async () => {
    const text = await readInput('Hi: ');

    console.log(text);
}

main();