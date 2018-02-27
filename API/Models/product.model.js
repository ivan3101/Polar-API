const Bluebird = require('bluebird');
const Mongoose = require('mongoose');
const ProductSchema = new Mongoose.Schema({
    'name': {
        type: String,
        required: true
    },
    'size': {
        type: String,
        required: true
    },
    'imagePath': {
        type: String,
        required: true
    },
    'weight': {
        type: String,
        required: true
    },
    'expeditionDate': {
        type: Date,
        required: true
    },
    'expirationDate': {
        type: Date
    },
    'stock': {
        type: Number,
        required: true
    },
    'price': {
        type: Number,
        required: true
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

ProductSchema.pre('save', async function() {
   const name = this.constructor.findOne({
       'name': this.name,
       'isActive': true
   });
   if (await name) {
       console.log('nombre existe');
   }
});

module.exports = Mongoose.model('Product', ProductSchema);