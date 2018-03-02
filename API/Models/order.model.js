const Uuid = require('uuid/v4');
const Mongoose = require('mongoose');
const OrderSchema = new Mongoose.Schema({
    'orderId': {
        type: String,
        default: Uuid(),
    },
    'buyer': {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Client'
    },
    'products': [{
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
    'totalPrice': {
        type: Number,
        required: true
    },
    'shippingAddress': {
        type: String,
        required: true
    },
    'status': {
        type: String,
        enum: ['Shipped', 'Processing', 'Canceled'],
        default: 'Processing'
    },
    'dateOrdered': {
        type: Date,
        default: Date.now()
    }
});
