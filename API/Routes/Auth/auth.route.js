const Express = require('express');
const Router = Express.Router();
const Client = require('../../Controllers/client.controller');

Router
    .route('/signup')
    .post((new Client).create);

module.exports = Router;