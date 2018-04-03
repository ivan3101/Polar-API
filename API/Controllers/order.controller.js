const Order = require('../Models/order.model');

class OrderController {
    async create(req, res) {
        const order = new Order(req.body);
        await order.save();
        res
            .status(201)
            .json(order);
    }

    async getOrdersByUser(req, res) {
        const id = req.query.id;
        const state = decodeURIComponent(req.query.state);
        const orders = await Order.find({
            'buyer': id,
            'status': new RegExp(state, 'i')
        }).populate('buyer');
        res
            .status(200)
            .json(orders);
    }

    async getAllorders(req, res){
        const state = decodeURIComponent(req.query.state);
        const orders = await Order.find({
            'status': new RegExp(state, 'i')
        }).populate('buyer');
        res
            .status(200)
            .json(orders);
    }

    async cancelOrder(req, res) {
        const id = req.params.id;
        const state = decodeURIComponent(req.query.state);
        await Order.update({
            '_id': id,
        }, {
            $set: {'status': state}
        });
        res
            .status(204)
            .json();
    }
}

module.exports = OrderController;