const Argon = require('argon2');
const Bluebird = require('bluebird');
const Mongoose = require('mongoose');
const clientSchema = new Mongoose.Schema({
    'businessName': {
        type: String,
        required: true
    },
    'hashedPassword': {
        type: String,
        required: true
    },
    'ownerName': [
        {
            type: String,
            required: true
        }
    ],
    'email': {
        type: String,
        required: true
    },
    'rif': {
        type: String,
        required: true
    },
    'address': {
        type: String,
        required: true
    },
    'tlpNumber': {
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

clientSchema.methods.encryptPassword =  function(password) {
    return Argon.hash(password, {
        type: Argon.argon2id
    });
};

clientSchema.methods.toJSON = function() {
    const obj = this.toObject();
    delete obj.hashedPassword;
    delete obj.__v;
    delete obj.isActive;
    return obj;
};

clientSchema.methods.checkPassword = function(password) {
    return Argon.verify(this.hashedPassword, password);
};

clientSchema.pre('save', function() {
    const rif = this.constructor.findOne({
        'rif': this.rif,
        'isActive': true
    });
    const businessName = this.constructor.findOne({
        'businessName': this.businessName,
    });
    Bluebird.all([rif, businessName]).then(values => {
        if (values[0]) {
            console.log('Ya existe rif')
        }
        if (values[1]) {
            console.log('Ya existe nombre')
        }
    });
    return next();
});

module.exports = Mongoose.model('Client', clientSchema);