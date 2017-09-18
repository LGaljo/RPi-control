var express = require('express');
var fs = require('fs');
var session = require('express-session');
var router = express.Router();

router.use(session({
    secret : "mylittlesecret",
    saveUninitialized: true,
    resave: true,
    cookie : {
        maxAge : 1000*10 // 10 sekund
    }
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

/* GET home page. */
router.get('/', function(req, res, next) {
    if (!req.session.login) {
        res.render('login', { title: 'RPi Login', response: " " });
    } else {
        res.render('index', { title: 'RPi Control', response: " ", login_status: "Odjava" });
    }
});

router.get('/login', function(req, res) {
    if (req.session.login) {
        res.redirect('/');
    } else {
        res.render('login', { title: 'RPi Login', response: " " });
    }
});

router.post('/log', function(req,res) {
    var user_name = req.body.user;
    var password = req.body.password;
    console.log("User name = "+user_name+", password is "+password);
    if (user_name === "username" && password === "password") {
        req.session.login = {user: req.body.user};
        res.render('index', { title: 'RPi Control', response: " ", login_status: "Odjava" });
    } else {
        res.end('null');
    }
});

router.get('/toggle', function(req, res, next) {
    if (req.session.login) {
        try {
            setTimeout(function() {
                out = 'Toggle        ||  ' + getCurrentDateNow() + '   ' + 'User-Agent: ' + req.headers['user-agent'];
                console.log('Toggle        ||  ' + getCurrentDateNow());
                writeToFile(out);
            }, 1500);
        } catch (err) {
            console.log(err);
        }
        res.redirect('/');
    } else {
        res.redirect('/login');
    }
});

router.get('/on', function(req, res, err) {
    if (req.session.login) {
        try {
            var out = 'Relay 2 Up    ||  ' + getCurrentDateNow() + '   ' + 'User-Agent: ' + req.headers['user-agent'];
            writeToFile(out);
        } catch (err) {
            console.log(err);
        }
        res.redirect('/');
    } else {
        res.redirect('/login');
    }
});

router.get('/off', function(req, res, err) {
    if (req.session.login) {
        try {
            out = 'Relay 2 Down  ||  ' + getCurrentDateNow() + '   ' + 'User-Agent: ' + req.headers['user-agent'];
            writeToFile(out);
        } catch (err) {
            console.log(err);
        }
        res.redirect('/');
    } else {
        res.redirect('/login');
    }
});

module.exports = router;
