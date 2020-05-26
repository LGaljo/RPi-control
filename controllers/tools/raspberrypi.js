const piblaster = require('pi-blaster.js');
const chalk = require('chalk');
const Gpio = require('onoff').Gpio;
const LOW = Gpio.LOW;
const HIGH = Gpio.HIGH;

let doors;
let other;
const switch1 = 23;
const switch2 = 24;
const pinGREEN = 26;
const pinRED = 19;
const pinBLUE = 16;

if (process.env.ON_RPI === 'true') {
    doors = new Gpio(switch1, 'out', 'none', {reconfigureDirection: true, activeLow: true});
    doors.writeSync(LOW);
    other = new Gpio(switch2, 'out', 'none', {reconfigureDirection: true, activeLow: true});
    other.writeSync(LOW);
}

module.exports.unlock = function () {
    if (process.env.ON_RPI === 'true') {
        doors.write(LOW, (error) => {
            if (error) {
                console.log(chalk.red("Napaka pri odklepu: "), error);
            }
        });
        setTimeout(function () {
            if (process.env.ON_RPI === 'true') doors.write(HIGH, (error) => {
                if (error) {
                    console.log(chalk.red("Napaka pri odklepu: "), error);
                }
            });
        }, 1500);
    }
};


let status = LOW;
module.exports.toggleSecond = function () {
    if (process.env.ON_RPI === 'true') {
        other.writeSync(status);
    }
    status = status === HIGH ? LOW : HIGH;
    return status;
};

module.exports.setColor = function (red, green, blue) {
    if (process.env.ON_RPI === 'true') {
        piblaster.setPwm(pinRED, red / 255, (error) => {
            if (error) {
                console.log(chalk.red(error));
            }
        });
        piblaster.setPwm(pinGREEN, green / 255, (error) => {
            if (error) {
                console.log(chalk.red(error));
            }
        });
        piblaster.setPwm(pinBLUE, blue / 255, (error) => {
            if (error) {
                console.log(chalk.red(error));
            }
        });
    }
};
