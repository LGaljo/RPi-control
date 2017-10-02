var express = require('express');
var fs = require('fs');
var session = require('express-session');
var router = express.Router();

var usernameG = "username";
var passwordG = "password";

var switch1 = 23;
var switch2 = 24;

var isOnRPi = false;

if (isOnRPi) {
    var Gpio = require('onoff').Gpio,
        doors = new Gpio(switch1, 'high'),
        other = new Gpio(switch2, 'high');
}

router.use(session({
    secret : "mylittlesecret",
    saveUninitialized: true,
    resave: false,
    cookie : {
        maxAge : 1000*60, // 60 sekund
        secure: true
    },
    rolling: true
}));

function writeToFile(string) {
    fs.appendFile('./RelayLog.txt', string + '\n', function(err) {
        if (err) console.log('Error while I/O operation');
    });
}

function getCurrentDateNow() {
    var currentdate = new Date();
    return currentdate.getDate() + "/"
        + (currentdate.getMonth()+1)  + "/"
        + currentdate.getFullYear() + "   "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds();
}

function isSecure(req, res) {
    if (!req.secure) {
        res.redirect("https://" + req.headers["host"] + req.url);
        return false;
    }
    return true;
}

router.get('/', function(req, res, next) {
    if (isSecure(req, res)) {
        if (!req.session.login) {
            res.render('login', { title: 'RPi Login'});
        } else {
            res.render('index', {title: 'RPi Control', response: "Idle"});
        }
    }
});

router.get('/login', function(req, res) {
    if (isSecure(req, res)) {
        if (req.session.login) {
            res.redirect('/');
        } else {
            res.render('login', {title: 'RPi Login'});
        }
    }
});

router.post('/log', function(req,res) {
    if (isSecure(req, res)) {
        var user_name = req.body.user;
        var password = req.body.password;
        console.log("User name = " + user_name + ", password is " + password);
        if (user_name === usernameG && password === passwordG) {
            req.session.login = {user: req.body.user};
            res.send("true");
        } else {
            res.end("false");
        }
    }
});

router.post('/action', function(req, res, err) {
    var action = req.body.action;
    if (isSecure(req, res)) {
        if (req.session.login) {
            var out = "";
            try {
                switch (action) {
                    case 'toggle':
                        if (isOnRPi) doors.writeSync(0);
                        setTimeout(function () {
                            if (isOnRPi) doors.writeSync(1);
                            out = 'Toggle        ||  ' + getCurrentDateNow() + '   ' + 'User-Agent: ' + req.headers['user-agent'];
                        }, 1500);
                        res.send({response: 'Toggle'});
                        break;
                    case 'on':
                        if (isOnRPi) other.writeSync(0);
                        out = 'Relay 2 Up    ||  ' + getCurrentDateNow() + '   ' + 'User-Agent: ' + req.headers['user-agent'];
                        res.send({response: 'ON'});
                        break;
                    case 'off':
                        if (isOnRPi) other.writeSync(1);
                        out = 'Relay 2 Down  ||  ' + getCurrentDateNow() + '   ' + 'User-Agent: ' + req.headers['user-agent'];
                        res.send({response: 'OFF'});
                        break;
                    default:
                        out = "Error";
                        break;
                }
                console.log(out);
                writeToFile(out);
            } catch (err) {
                console.log(err);
            }
        }
    }
});

module.exports = router;
