/*
var passport = require('passport');
var mongoose = require('mongoose');
var Uporabnik = mongoose.model('Uporabnik');

var vrniJsonOdgovor = function(odgovor, status, vsebina) {
    odgovor.status(status);
    odgovor.json(vsebina);
};
*/
/*
module.exports.prijava = function(req, res, next) {
    if (!req.body.username || !req.req.geslo) {
        vrniJsonOdgovor(res, 400, {
            "sporocilo": "Zahtevani so vsi podatki"
        });
    }
    passport.authenticate('local', {}, function(napaka, uporabnik, podatki) {
        if (napaka) {
            vrniJsonOdgovor(res, 404, napaka);
            return;
        }
        if (uporabnik) {
            vrniJsonOdgovor(res, 200, {
                "zeton": uporabnik.generirajJwt()
            });
        } else {
            vrniJsonOdgovor(res, 401, podatki);
        }
    })(req, res);
};
*/