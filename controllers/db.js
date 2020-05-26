const mongoose = require('mongoose');
const chalk = require('chalk');

let dbURI = process.env.MONGO_CONN_PATH;
mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', function() {
    console.log(chalk.blue('Mongoose je povezan na ' + dbURI));
});

mongoose.connection.on('error', function(err) {
    console.log(chalk.red('Mongoose napaka pri povezavi: ' + err));
});

mongoose.connection.on('disconnected', function() {
    console.log(chalk.red('Mongoose je zaprl povezavo'));
});

const pravilnaUstavitev = function (sporocilo, povratniKlic) {
    mongoose.connection.close(function () {
        console.log(chalk.red('Mongoose je zaprl povezavo preko ' + sporocilo));
        povratniKlic();
    });
};

// Pri ponovnem zagonu nodemon
process.once('SIGUSR2', function() {
    pravilnaUstavitev('nodemon ponovni zagon', function() {
        process.kill(process.pid, 'SIGUSR2');
    });
});

// Pri izhodu iz aplikacije
process.on('SIGINT', function() {
    pravilnaUstavitev('izhod iz aplikacije', function() {
        process.exit(0);
    });
});

// Pri izhodu iz aplikacije na Heroku
process.on('SIGTERM', function() {
    pravilnaUstavitev('izhod iz aplikacije na Heroku', function() {
        process.exit(0);
    });
});

require('./models');

// let dodajUporabnika = require('./addUser');
// dodajUporabnika.dodajUporabnika();
