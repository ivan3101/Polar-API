const Product = require('../Models/product.model');

class ProductController {
    async create(req, res) {
        const product = new Product(req.body);
        await product.save();
        res
            .status(201)
            .json(product);
    }

    async modify(req, res) {
        const id = req.params.id;
        await Product.update({
            '_id': id,
            'isActive': true
        }, { $set: req.body });
        res
            .status(204)
            .json();
    }

    async delete(req, res) {
        const id = req.params.id;
        await Product.update({
            '_id': id,
            'isActive': true
        }, { $set: { 'isActive': false } });
        res
            .status(204)
            .json();
    }

    async getAll(req, res) {
        const quantity = 10;
        const page = req.query.page || 1;
        const products = await Product.find({
            'isActive': true
        })
            .skip((quantity * page) - quantity)
            .limit(+quantity);
        res
            .status(200)
            .json(products);
    }

    async getSingle(req, res) {
        const id = req.params.id;
        const product = Product.findOne({
            '_id': id,
            'isActive': true
        });
        res
            .status(200)
            .json(product);
    };
}

module.exports = ProductController;