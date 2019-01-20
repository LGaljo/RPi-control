let piblaster = require('pi-blaster.js');

let doors;
let other;
const switch1 = 23;
const switch2 = 24;
const pinGREEN = 26;
const pinRED = 19;
const pinBLUE = 16;

if (process.env.ON_RPI === false) {
    const Gpio = require('onoff').Gpio;
    doors = new Gpio(switch1, 'high');
    other = new Gpio(switch2, 'high');
}

module.exports.unlock = function () {
    if (process.env.ON_RPI) doors.write(0, (error) => {
        if (error) {
            console.log("Napaka pri odklepu: ", error);
        }
    });
    setTimeout(function () {
        if (process.env.ON_RPI) doors.write(1, (error) => {
            if (error) {
                console.log("Napaka pri odklepu: ", error);
            }
        });
    }, 1500);
};


let status = 0;
module.exports.toggleSecond = function () {
    if (process.env.ON_RPI) {
        other.writeSync(status);
    }
    if (status === 1) {
        status = 0;
    } else {
        status = 1;
    }
    return status;
};

module.exports.setColor = function (red, green, blue) {
    if (process.env.ON_RPI) {
        piblaster.setPwm(pinRED, red / 255, (error) => {
            if (error) {
                console.log(error);
            }
        });
        piblaster.setPwm(pinGREEN, green / 255, (error) => {
            if (error) {
                console.log(error);
            }
        });
        piblaster.setPwm(pinBLUE, blue / 255, (error) => {
            if (error) {
                console.log(error);
            }
        });
    }
};
