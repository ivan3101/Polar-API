const Uuid = require('uuid/v4');
const { price, address } = require('../Validators');
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
    'products': {
        type: [Mongoose.Schema.Types.ObjectId]
        ,
        ref: 'Product'
    },
    'totalPrice': {
        type: String,
        required: [true, 'El precio total de la compra es requerido'],
        trim: true,
        validate: {
            validator: price,
            message: 'Debe ingresar un precio total con un formato valido'
        }
    },
    'shippingAddress': {
        type: String,
        required: [true, 'La direccion de envio es requerida'],
        validate: {
            validator: address,
            address: 'La direccion de envio solo puede contener letras y numeros'
        }
    },
    'status': {
        type: String,
        enum: ['Entregado', 'En espera', 'Cancelado'],
        default: 'En espera'
    },
    'dateOrdered': {
        type: Date,
        default: Date.now()
    }
});

module.exports = Mongoose.model('Order', OrderSchema);
