/*
var passport = require('passport');
var LokalnaStrategija = require('passport-local').Strategy;
var mongoose = require('mongoose');
var Uporabnik = mongoose.model('Uporabnik');

passport.use(new LokalnaStrategija({
        usernameField: 'elektronskiNaslov',
        passwordField: 'geslo'
    },
    function(uporabniskoIme, geslo, koncano) {
        Uporabnik.findOne(
            {
                username: uporabniskoIme
            },
            function(napaka, uporabnik) {
                if (napaka)
                    return koncano(napaka);
                if (!uporabnik) {
                    return koncano(null, false, {
                        sporocilo: 'Napačno uporabniško ime'
                    });
                }
                if (!uporabnik.preveriGeslo(geslo)) {
                    return koncano(null, false, {
                        sporocilo: 'Napačno geslo'
                    });
                }
                return koncano(null, uporabnik);
            }
        );
    }
));
*/
