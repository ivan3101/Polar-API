const Express = require('express');
const Router = Express.Router();
const Client = require('../../Controllers/client.controller');

Router
    .route('/signin')
    .post((new Client).login);

module.exports = Router;