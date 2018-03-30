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
        },
        trim: true
    },
    'imagePath': {
        type: String,
        required: [true, 'La imagen del producto es requerida'],
        trim: true
    },
    'weight': {
        type: String,
        required: [true, 'El peso del producto es requerido'],
        validate: {
            validator: Validators.price,
            message: 'Debe ingresar un peso valido'
        },
        trim: true
    },
    'stock': {
        type: Number,
        required: [true, 'El stock del producto es requerido'],
        trim: true
    },
    'price': {
        type: Number,
        required: [true, 'El precio del producto es requerido'],
        validate: {
            validator: Validators.price,
            message: 'Debe ingresar un precio valido'
        }
    },
    'brand': {
        type: String,
        required: [true, 'La marca del producto es requerida'],
        validate: {
            validator: Validators.alphaSpacesDots,
            message: 'Debe ingresar una marca valida'
        },
        trim: true
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