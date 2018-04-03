const Express = require('express');
const Router = Express.Router();
const ClientClass = require('../../Controllers/client.controller');
const Client = new ClientClass();
const Miscellaneous = require('../../Config/miscellaneous');
const { handleAsyncExceptions } = require('../../Errors');

Router
    .route('/')
    .get(handleAsyncExceptions(Client.getAll))
    .post(handleAsyncExceptions(Client.create));

Router
    .route('/:id')
    .get(handleAsyncExceptions(Client.getSingle))
    .put(handleAsyncExceptions(Client.modify))
    .delete(handleAsyncExceptions(Client.delete));

Router
    .route('/:id/cards')
    .get(handleAsyncExceptions(Miscellaneous.getCards))
    .put(handleAsyncExceptions(Miscellaneous.addCard));

Router
    .route('/:clientId/cards/:cardId')
    .delete(handleAsyncExceptions(Miscellaneous.deleteCard));

module.exports = Router;