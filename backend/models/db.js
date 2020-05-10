const mongoose = require('mongoose');
const AdminBro = require('admin-bro');

//Initalize DB and models
const dbURI = 'mongodb://localhost/emig';

// We have to tell AdminBro that we will manage mongoose resources with it
AdminBro.registerAdapter(require('admin-bro-mongoose'))

mongoose
    .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
    .catch(e => {
        console.error('Connection error', e.message)
    })
    


// Monitor and report when database is connected
mongoose.connection.on('connected', function () {
    console.log('Mongoose connected to ' + dbURI);
});

// Monitor and report error connecting to database
mongoose.connection.on('error',function (err) {
    console.log('Mongoose connection error: ' + err);
});

// Monitor and report when database is disconnected
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected');
});
// Closes (disconnects) from Mongoose DB upon shutdown
gracefulShutdown = function (msg, callback) {
    mongoose.connection.close(function () {
	console.log('Mongoose disconnected through ' + msg);
	callback();
    });
};

// For app termination
process.on('SIGINT', function() {
    gracefulShutdown('app termination', function () {
	process.exit(0);
    });
});

require('./Story');
require('./Region');