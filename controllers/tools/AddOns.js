let fs = require('fs');
const chalk = require('chalk');

module.exports.getCurrentDateNow = function () {
    let currentdate = new Date();
    return currentdate.getDate() + "/"
        + (currentdate.getMonth() + 1) + "/"
        + currentdate.getFullYear() + "   "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds();
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
