const chalk = require('chalk');
const divider = chalk.gray('\n-----------------------------------');

const logger = {

    error: err => {
        console.error(`ERROR : ${chalk.red(err)}`);
    },

    info: msg => {
        console.log(`INFO  : ${chalk.cyan(msg)}`)
    },

    debug: msg => {
        console.log(`DEBUG :  ${chalk.gray(msg)}`)
    },

    appStarted: (interval, port) => {
        console.log(divider);
        console.log(`App started! ${chalk.green('✓')}`);
        console.log(`Interval   : ${chalk.green(interval)}`);
        console.log(`Port       : ${chalk.green(port)}`)
        console.log(divider);
    },
};

module.exports = logger;
