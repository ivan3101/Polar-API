const Argon = require('argon2');
const Mongoose = require('mongoose');
const employeeSchema = new Mongoose.Schema({
    'name': {
        type: String,
        required: true
    },
    'cedula': {
        type: Number,
        required: true
    },
    'hashedPassword': {
        type: String,
        required: true
    },
    'email': {
        type: String,
        required: true
    },
    'isActive': {
        type: Boolean,
        required: true,
        default: true
    }
});

employeeSchema.methods.toJSON = function() {
    const obj = this.toObject();
    delete obj.__v;
    delete obj.hashedPassword;
    delete obj.isActive;
    return obj;
};

employeeSchema.methods.encryptPassword = function(password) {
    return Argon.hash(password, {
        'type': Argon.argon2id
    });
};

employeeSchema.methods.checkPassword = function(password) {
    return Argon.verify(this.hashedPassword, password);
};

employeeSchema.pre('save', async function() {
    const email = this.constructor.findOne({
        'email': this.email,
        'isActive': true
    });
    if (await email) {
        console.log('Ya existe email');
    }
    // return next();
});

module.exports = Mongoose.model('Employee', employeeSchema);