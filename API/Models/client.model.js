const Argon = require('argon2');
const Bluebird = require('bluebird');
const Boom = require('boom');
const Validators = require('../Validators');
const Mongoose = require('mongoose');
const clientSchema = new Mongoose.Schema({
    'businessName': {
        type: String,
        required: [true, 'El nombre del negocio es requerido'],
        trim: true,
        validate: {
            validator: Validators.onlyAlphaAndNumbersAndSpaces,
            message: 'El nombre del negocio solo puede contener letras, numeros y espacios'
        },
    },
    'hashedPassword': {
        type: String,
        required: [true, 'La contraseña es requerida']
    },
    'ownerName': [{
        type: String,
        required: [true, 'El nombre del dueño(s) del negocio es requerido'],
        trim: true,
        validate: {
            validator: Validators.onlyAlphaAndSpaces,
            message: 'El nombre del dueño(s) del negocio solo puede contener letras y espacios'
        }
    }],
    'email': {
        type: String,
        required: [true, 'El email de contacto es requerido'],
        trim: true,
        validate: {
            validator: Validators.email,
            message: 'Debe ingresar un email valido'
        }
    },
    'rif': {
        type: String,
        required: [true, 'El RIF del negocio es requerido'],
        trim: true,
        validate: {
            validator: Validators.rif,
            message: 'Debe ingresar un RIF valido'
        }
    },
    'address': {
        type: String,
        required: [true, 'La direccion fisica del negocio es requerida'],
        trim: true,
        validate: {
            validator: Validators.address,
            message: 'La dirección fisica del negocio solo puede contener letras, numeros y puntos (.)'
        }

    },
    'tlpNumber': {
        type: String,
        required: [true, 'Un numero de telefono de contacto es requerido'],
        trim: true,
        validate: {
            validator: Validators.phoneNumbers,
            message: 'Debe ingresar un numero de telefono con un formato valido.'
        }
    },
    'payMethod': [{
        'cardholderName': {
            type: String,
            trim: true,
            required: [true, 'El nombre del dueño de la tarjeta es necesario'],
            validate: {
                validator: Validators.onlyAlphaAndSpaces,
                message: 'Debe ingresar un nombre valido'
            },
        },
        'cardNumber': {
            type: String,
            validate: {
                validator: Validators.cards,
                message: 'Debe ingresar un numero de tarjeta valido'
            },
            trim: true,
            required: [true, 'El numero de la tarjeta es requerido']
        },
        'expDate': {
            type: Date,
            required: [true, 'La fecha de vencimiento de la tarjeta es requerido']
        },
        'cedula': {
            type: String,
            required: [true, 'La cedula asociada a la tarjeta es requerido'],
            trim: true,
            validate: {
                validator: Validators.cedula,
                message: 'Debe ingresar una cedula valida'
            }
        },
        'csc': {
            type: Number,
            required: [true, 'El CSC es requerido'],
            trim: true
        }
    }],
    'registerDate': {
        type: Date,
        default: Date.now()
    },
    'isActive': {
        type: Boolean,
        default: true
    }
});

clientSchema.methods.encryptPassword =  function(password) {
    return Argon.hash(password, {
        type: Argon.argon2id
    });
};

clientSchema.methods.toJSON = function() {
    const obj = this.toObject();
    delete obj.hashedPassword;
    delete obj.payMethod;
    delete obj.__v;
    delete obj.isActive;
    return obj;
};

clientSchema.methods.checkPassword = function(password) {
    return Argon.verify(this.hashedPassword, password);
};

clientSchema.pre('save', function(next) {
    console.log(this.rif);
    const rif = this.constructor.findOne({
        'rif': new RegExp('^' + this.rif + '$', 'i'),
        'isActive': true
    });
    const businessName = this.constructor.findOne({
        'businessName': new RegExp('^' + this.businessName + '$', 'i'),
        'isActive': true
    });
    const email = this.constructor.findOne({
        'email': new RegExp('^' + this.email + '$', 'i'),
        'isActive': true
    });
    Bluebird.all([rif, businessName, email]).then(values => {
        if (values[0]) return next(Boom.conflict('Ya esta registrado un negocio con ese RIF en esta pagina.'));
        if (values[1]) return next(Boom.conflict('Ya esta registrado un negocio con ese nombre en esta pagina.'));
        if (values[2]) return next(Boom.conflict('Ya esta registrado un negocio con ese correo electronico en esta pagina.'));
        return next();
    });
});

module.exports = Mongoose.model('Client', clientSchema);