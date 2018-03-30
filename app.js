// Establishing connection with the database
require('./API/Config/db_connection');

// Imports
const Express = require('express');
const App = Express();
const Morgan = require('morgan');
const Helmet = require('helmet');
const Cors = require('cors');
const BodyParser = require('body-parser');
const Passport = require('passport');
const Routes = require('./API/Routes');
const ErrorHandlers = require('./API/Errors');
const PORT = process.env.PORT || 3000;

// Middlewares
if (App.get('ENV') === 'development') {
    App.use(Morgan('dev'));
} else {
    App.use(Morgan('short'))
}
App.use(Helmet());
App.use(Cors());
App.use(BodyParser.json());
App.use(BodyParser.urlencoded({
    extended: false
}));
App.use(Passport.initialize());

// Routes
App.use('/api', Routes);

// Error handlers
App.use(ErrorHandlers.validationError);
App.use(ErrorHandlers.errorHandler);

// Starting server
App.listen(PORT, () => console.log(`API is running in port: ${PORT}`));