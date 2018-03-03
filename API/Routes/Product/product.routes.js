const Express = require('express');
const Router = Express.Router();
const ProductClass = require('../../Controllers/product.controller');
const Product = new ProductClass();
const { handleAsyncExceptions } = require('../../Errors');

Router
    .route('/')
    .get(handleAsyncExceptions(Product.getAll))
    .post(handleAsyncExceptions(Product.create));

Router
    .route('/:id')
    .get(handleAsyncExceptions(Product.getSingle))
    .put(handleAsyncExceptions(Product.modify))
    .delete(handleAsyncExceptions(Product.delete));

module.exports = Router;
