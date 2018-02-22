// Establishing connection with the database
require('./API/Config/db_connection');

// Imports
const Express = require('express');
const App = Express();
const Morgan = require('morgan');
const Helmet = require('helmet');
const BodyParser = require('body-parser');
const Passport = require('passport');
const Routes = require('./API/Routes');
const PORT = process.env.PORT || 3000;

// Middlewares
if (App.get('ENV') === 'development') {
    App.use(Morgan('dev'));
} else {
    App.use(Morgan('short'))
}
App.use(Helmet());
App.use(BodyParser.json());
App.use(BodyParser.urlencoded({
    extended: false
}));
App.use(Passport.initialize());

// Routes
App.use('/', Routes);

// Starting server
App.listen(PORT, () => console.log(`API is running in port: ${PORT}`));