const Boom = require('boom');
const Validators = require('../Validators');
const Mongoose = require('mongoose');
const ProductSchema = new Mongoose.Schema({
    'name': {
        type: String,
        required: [true, 'El nombre del producto es requerido'],
        validate: {
            validator: Validators.onlyAlphaAndSpaces,
            message: 'El nombre del producto solo puede contener letras'
        }
    },
    'size': {
        type: String,
        required: [true, 'El tamaño del producto es requerido'],
        validate: {
            validator: Validators.size,
            message: 'Debe ingresar el peso del producto con el formato Ancho x Alto'
        }
    },
    'imagePath': {
        type: String,
        required: [true, 'La imagen del producto es requerida'],
    },
    'weight': {
        type: String,
        required: [true, 'El peso del producto es requerido'],
        validate: {
            validator: Validators.price,
            message: 'Debe ingresar un peso valido'
        }
    },
    'expeditionDate': {
        type: Date,
        required: [true, 'La fecha de expedición del producto es requerida'],
        validate: {
            validator: Validators.expDate,
            message: 'Debe ingresar una fecha de expedición con el formato MM/YYYY'
        }
    },
    'expirationDate': {
        type: Date,
        required: [true, 'La fecha de expiración del producto es requerida'],
        validate: {
            validator: Validators.expDate,
            message: 'Debe ingresar una fecha de expiración con el formator MM/YYYY'
        }
    },
    'stock': {
        type: String,
        required: [true, 'El stock del producto es requerido']
    },
    'price': {
        type: Number,
        required: [true, 'El precio del producto es requerido'],
        validate: {
            validator: Validators.price,
            message: 'Debe ingresar un precio valido'
        }
    },
    'registerDate': {
        type: Date,
        default: Date.now()
    },
    'isActive': {
        type: Boolean,
        default: true
    }
});

ProductSchema.methods.toJSON = function() {
    const obj = this.toObject();
    delete obj.isActive;
    return obj;
};

ProductSchema.pre('save', async function(next) {
   const name = this.constructor.findOne({
       'name': this.name,
       'isActive': true
   });
   if (await name) {
       return next(Boom.conflict('Ya existe un producto con ese nombre registrado en esta pagina'))
   }
   next();
});

module.exports = Mongoose.model('Product', ProductSchema);