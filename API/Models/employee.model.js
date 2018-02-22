const Argon = require('argon2');
const Mongoose = require('mongoose');
const Bluebird = require('bluebird');
const employeeSchema = new Mongoose.Schema({
    'name': {
        type: String,
        required: true
    },
    'cedula': {
        type: Number,
        required: true
    },
    'username': {
        type: String,
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

employeeSchema.pre('save', function() {
    const email = this.constructor.findOne({
        'email': this.email,
        'isActive': true
    });
    const username = this.constructor.findOne({
        'username': this.username,
        'isActive': true
    });

    Bluebird.all([email, username]).then(values => {
        if (values[0]) {
            console.log('Ya existe email')
        }
        if (values[1]) {
            console.log('Ya existe nombre de usuario')
        }
    });
    return next();
});

module.exports = Mongoose.model('Employee', employeeSchema);