let fs = require('fs');
const chalk = require('chalk');

module.exports.getCurrentDateNow = function () {
    return new Date().toISOString();
};

module.exports.writeToFile = function(string) {
    let destination;
    if (process.env.ON_RPI === false) {
        destination = '/home/pi/nodejs/RelayLog.txt';
    } else {
        destination = './RelayLog.txt';
    }

    try {
        fs.appendFile(destination, string + '\n', function (err) {
            if (err) console.log(chalk.red('Error while I/O operation'));
        });
    } catch (e) {
        console.log(chalk.red("Error writing to log file"));
    }
};
