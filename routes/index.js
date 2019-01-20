const express = require('express');
const session = require('express-session');
const router = express.Router();

const mainCtrl = require('../controllers/main');
const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 24 ur
        secure: true
    },
    rolling: true
}));

// Security middleware
router.use(function (req, res, next) {
    if (req.secure) {
        next();
    } else {
        let host = req.headers.host.split(":")[0];
        res.redirect("https://" + host + ":" + process.env.SECURE_PORT + req.url);
    }
});

router.post('/', mainCtrl.action);
router.get('/', mainCtrl.indexPage);
router.get('/login', mainCtrl.loginPage);
router.post('/login', mainCtrl.login);
router.get('/lights', mainCtrl.lightsPage);
router.post('/lights', mainCtrl.lights);

module.exports = router;
