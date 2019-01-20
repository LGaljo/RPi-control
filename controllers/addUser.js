const mongoose = require('mongoose');
const Uporabnik = mongoose.model('Uporabnik');
/*
module.exports.dodajUporabnika = function () {
    let uporabnik = new Uporabnik();
    uporabnik.username = "";
    uporabnik.nastaviGeslo("");
    uporabnik.save((error) => {
        if (error) {
            console.log("Napaka pri dodajanju", error);
        } else {
            console.log("Uspešno dodano");
        }
    });
};
*/