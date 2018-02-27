const Express = require('express');
const Router = Express.Router();
const authRoutes = require('./Auth/auth.routes');
const clientRoutes = require('./Client/client.routes');

Router.use('/auth', authRoutes);
Router.use('/clients', clientRoutes);

module.exports = Router;