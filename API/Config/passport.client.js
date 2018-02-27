const Secret = require('./secret');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const ClientModel = require('../Models/client.model');
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = Secret.secret;

module.exports = function(Passport) {
    Passport.use(new JwtStrategy(opts, async function(jwt_payload, done) {
        const client = await ClientModel.findOne({
            '_id': jwt_payload._id,
            'isActive': true
        });
        if (client) return done(null, client);
        else return done(null, false);
    }));
};
