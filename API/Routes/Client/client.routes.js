const Express = require('express');
const Router = Express.Router();
const Client = require('../../Controllers/client.controller');

Router
    .route('/')
    .get(Client.getAllClients);

Router
    .route('/:clientId')
    .get(Client.getSingleClient)
    .put((new Client).modify)
    .delete((new Client).delete);

module.exports = Router;