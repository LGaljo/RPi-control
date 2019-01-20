let fs = require('fs');

let getCurrentDateNow = function () {
    let currentdate = new Date();
    return currentdate.getDate() + "/"
        + (currentdate.getMonth() + 1) + "/"
        + currentdate.getFullYear() + "   "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds();
};

function writeToFile(string) {
    let destination;
    if (process.env.ON_RPI) {
        destination = '/home/pi/nodejs/RelayLog.txt';
    } else {
        destination = './RelayLog.txt';
    }

    try {
        fs.appendFile(destination, string + '\n', function (err) {
            if (err) console.log('Error while I/O operation');
        });
    } catch (e) {
        console.log("Error writing to log file");
    }
}

module.exports = {getCurrentDateNow, writeToFile};