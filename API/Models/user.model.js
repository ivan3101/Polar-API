const Argon = require('argon2');
const Mongoose = require('mongoose');
const userSchema = new Mongoose.Schema({
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

userSchema.virtual('password')
    .set(async function(password) {
       this.hashedPassword = await Argon.hash(password, {
           type: Argon.argon2id
       });
    })
    .get(function() {
        return this.hashedPassword;
    });


userSchema.methods.toJSON = function() {
    const obj = this.toObject();
    delete obj.hashedPassword;
    delete obj.__v;
    delete obj.isActive;
    return obj;
};

userSchema.methods.checkPassword = async function(password) {
  return await Argon.verify(this.hashedPassword, password);
};

module.exports = Mongoose.model('User', userSchema);