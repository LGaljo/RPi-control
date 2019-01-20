var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var uporabnikSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    zgoscenaVrednost: {type: String, required: true},
    nakljucnaVrednost: {type: String, required: true}
});

uporabnikSchema.methods.nastaviGeslo = function(geslo) {
    this.nakljucnaVrednost = crypto.randomBytes(16).toString('hex');
    this.zgoscenaVrednost = crypto.pbkdf2Sync(geslo, this.nakljucnaVrednost, 1000, 64, 'sha512').toString('hex');
};

uporabnikSchema.methods.preveriGeslo = function(geslo) {
    var zgoscenaVrednost = crypto.pbkdf2Sync(geslo, this.nakljucnaVrednost, 1000, 64, 'sha512').toString('hex');
    return this.zgoscenaVrednost == zgoscenaVrednost;
};
/*
uporabnikSchema.methods.generirajJwt = function() {
    var datumPoteka = new Date();
    datumPoteka.setDate(datumPoteka.getDate() + 7);

    return jwt.sign({
        _id: this._id,
        elektronskiNaslov: this.elektronskiNaslov,
        ime: this.ime,
        datumPoteka: parseInt(datumPoteka.getTime() / 1000, 10)
    }, process.env.JWT_GESLO);
};
*/

var actionSchema = new mongoose.Schema({
    uporabnik: uporabnikSchema,
    actions: {type: String, required: true},
    date: {type: String, required: true}
});

mongoose.model('Action', actionSchema, 'Actions');
mongoose.model('Uporabnik', uporabnikSchema, 'Uporabniki');