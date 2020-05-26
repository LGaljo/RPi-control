const mongoose = require('mongoose');
const Uporabnik = mongoose.model('Uporabnik');
const raspberrypi = require('../controllers/tools/raspberrypi');
const addOns = require('./tools/AddOns.js');
const chalk = require('chalk');

/**
 * Listen on / for GET
 * If you are logined, you wil be rendered front page, else
 * you will be rendered login page
 */
module.exports.indexPage = function (req, res, next) {
    if (!req.session.login) {
        res.render('login', {title: 'RPi Prijava', response: "Vpiši se"});
    } else {
        res.render('index', {title: 'RPi Nadzor', response: "Čakam"});
    }
};

/**
 * Listen on /action for POST
 * Manage relay implementation
 */
module.exports.action = function (req, res, next) {
    if (req.session.login) {
        let out = "";
        try {
            switch (req.body.action) {
                case 'unlock':
                    raspberrypi.unlock();
                    res.send({response: "Odklenjeno"});
                    res.end();
                    out = 'Unlock || ' + addOns.getCurrentDateNow() + ' ' + 'User-Agent: ' + req.headers['user-agent'];
                    addOns.writeToFile(out);
                    break;
                case 'toggle':
                    let status = raspberrypi.toggleSecond();
                    let response = status ? "ON" : "OFF";
                    res.send({response: response});
                    res.end();
                    out = 'Relay 2  ' + status ? 'ON ' : 'OFF' + '   ||  ' + addOns.getCurrentDateNow() + '   ' + 'User-Agent: ' + req.headers['user-agent'];
                    addOns.writeToFile(out);
                    break;
                default:
                    out = "Error";
                    break;
            }
            console.log(chalk.green(out));
        } catch (err) {
            console.log(chalk.red(err));
        }
    }
};

/**
 * Listen on /login for GET
 * If you are logged in, you wil be redirected to front page, else
 * you will be rendered login page
 */
module.exports.loginPage = function (req, res, next) {
    if (req.session.login) {
        res.redirect('/');
    } else {
        res.render('login', {title: 'RPi Prijava', response: "Vpiši se"});
    }
};

/**
 *  Listen on /login for POST
 */
module.exports.login = function (req, res, next) {
    if (!req.body.username || !req.body.password) {
        res.render('login', {title: 'RPi Prijava', response: "Napačno geslo"});
    }
    let password = req.body.password;
    let username = req.body.username;
    Uporabnik
        .findOne({username: username})
        .then((user) => {
            if (!user) {
                res.render('login', {title: 'RPi Prijava', response: "Napačno uporabniško ime"});
            } else {
                if (user.preveriGeslo(password)) {
                    req.session.login = {user: username};
                    res.redirect("/");
                } else {
                    res.render('login', {title: 'RPi Prijava', response: "Napačno geslo"});
                }
            }
        })
        .catch((error) => {
            res.render('login', {title: 'RPi Prijava', response: "Napaka: " + error});
        });
};

/**
 * Listen on /lights for GET
 * Render lights page or render login if not logged in
 */
module.exports.lightsPage = function (req, res, next) {
    if (req.session.login) {
        res.render('lights', {title: 'Luči'});
    } else {
        res.render('login', {title: 'RPi Prijava', response: "Vpiši se"});
    }
};

/**
 * Listen on /lights for POST
 * Manage lights implementation
 */
module.exports.lights = function (req, res, next) {
    if (req.session.login) {
        try {
            switch (parseInt(req.body.type)) {
                case 0:
                    // OFF
                    raspberrypi.setColor(0, 0, 0);
                    res.send("OFF");
                    break;
                case 1:
                    // Single color
                    let color = req.body.color.substring(1);

                    let red = parseInt(color.substring(0, 2), 16);
                    let green = parseInt(color.substring(2, 4), 16);
                    let blue = parseInt(color.substring(4, 6), 16);

                    raspberrypi.setColor(red, green, blue);
                    res.send("ON");
                    break;
                default:
                    console.log("Unkown type: " + req.body.type);
                    res.send("ERROR");
                    break;
            }

        } catch (error) {
            res.send(false);
        }
    }
};
