const Mongoose = require('mongoose');
const Bluebird = require('bluebird');
Mongoose.connect('mongodb://localhost/polar', {
    promiseLibrary: Bluebird
});
const connection = Mongoose.connection;

connection
    .on('connecting', () => console.log('Connecting to the Polar database...'))
    .on('connected', () => console.log('Connection established with the Polar database '))
    .on('disconnecting', () => console.log('Disconneting from the Polar database...'))
    .on('disconnected', () => console.log('Disconnected of the Polar database'));

process
    .on("SIGINT", () => {
        Mongoose.connection.close(() => {
            console.log("Connection to the database closed (SIGINT)");
            process.exit(0);
        })
    })
    .on("SIGTERM", () => {
        Mongoose.connection.close(() => {
            console.log("Connection to the database closed (SIGTERM)");
            process.exit(0);
        })
    })
    .once("SIGUSR2", () => {
        Mongoose.connection.close(() => {
            console.log("Connection to the database closed (SIGUSR2)");
            process.kill(process.pid, "SIGUSR2");
        })
    });