const Express = require('express');
const Router = Express.Router();
const ProductClass = require('../../Controllers/product.controller');
const Product = new ProductClass();

Router
    .route('/')
    .get(Product.getAll)
    .post(Product.create);

Router
    .route('/:id')
    .get(Product.getSingle)
    .put(Product.modify)
    .delete(Product.delete);

module.exports = Router;
