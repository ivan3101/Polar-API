const Express = require('express');
const Router = Express.Router();
const authRoutes = require('./Auth/auth.routes');
const clientRoutes = require('./Client/client.routes');
const employeeRoutes = require('./Employee/employee.routes');

Router
    .use('/auth', authRoutes)
    .use('/clients', clientRoutes)
    .use('/employees', employeeRoutes);

module.exports = Router;