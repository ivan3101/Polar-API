const Express = require('express');
const Router = Express.Router();
const ClientClass = require('../../Controllers/client.controller');
const Client = new ClientClass();

Router
    .route('/')
    .get(Client.getAll)
    .post(Client.create);

Router
    .route('/:id')
    .get(Client.getSingle)
    .put(Client.modify)
    .delete(Client.delete);

module.exports = Router;