const Argon = require('argon2');
const Bluebird = require('bluebird');
const Boom = require('boom');
const Validators = require('../Validators');
const Mongoose = require('mongoose');
const employeeSchema = new Mongoose.Schema({
    'name': {
        type: String,
        required: [true, 'El nombre del empleado es requerido'],
        trim: true,
        validate: {
            validator: Validators.onlyAlphaAndSpaces,
            message: 'El nombre del empleado solo puede contener letras'
        }
    },
    'cedula': {
        type: String,
        required: [true, 'La cedula del empleado es requerida'],
        trim: true,
        validate: {
            validator: Validators.cedula,
            message: 'Debe ingresar una cedula valida'
        }
    },
    'hashedPassword': {
        type: String,
        required: true
    },
    'email': {
        type: String,
        required: [true, 'El correo electronico del empleado es requerido'],
        validate: {
            validator: Validators.email,
            message: 'Debe ingresar un correo electronico valido'
        }
    },
    'level': {
        type: String,
        enum: ['admin', 'other'],
        default: 'other'
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

employeeSchema.pre('save', function(next) {
    const email = this.constructor.findOne({
        'email': this.email,
        'isActive': true
    });
    const cedula = this.constructor.findOne({
        'cedula': this.cedula,
        'isActive': true
    });
    Bluebird.all([email, cedula]).then(values => {
        if (values[0]) return next(Boom.conflict('Ya existe un empleado con ese correo electronico en esta pagina'));
        if (values[1]) return next(Boom.conflict('Ya existe un empleado con esa cedula registrado en esta pagina'));
        return next();
    })
});

module.exports = Mongoose.model('Employee', employeeSchema);