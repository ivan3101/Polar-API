const Order = require('../../Controllers/order.controller');
const OrderController = new Order();
const Express = require('express');
const Router = Express.Router();
const { handleAsyncExceptions } = require('../../Errors');

Router
    .route('/')
    .get(handleAsyncExceptions(OrderController.getAllorders))
    .post(handleAsyncExceptions(OrderController.create));

Router
    .route('/clients')
    .get(handleAsyncExceptions(OrderController.getOrdersByUser));

Router
    .route('/:id')
    .put(handleAsyncExceptions(OrderController.cancelOrder));

module.exports = Router;