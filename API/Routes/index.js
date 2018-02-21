const Express = require('express');
const Router = Express.Router();
const authRoutes = require('./Auth/auth.route');

Router.use('/auth', authRoutes);

module.exports = Router;