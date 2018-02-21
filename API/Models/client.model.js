const Argon = require('argon2');
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

clientSchema.virtual('password')
    .get(function() {
        return this.hashedPassword;
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

module.exports = Mongoose.model('Client', clientSchema);