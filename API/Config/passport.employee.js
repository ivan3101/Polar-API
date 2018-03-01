const Secret = require('./secret');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const EmployeeModel = require('../Models/employee.model');
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = Secret.secret;

module.exports = function(Passport) {
    Passport.use(new JwtStrategy(opts, async function(jwt_payload, done) {
        const employee = await EmployeeModel.findOne({
            '_id': jwt_payload._id,
            'isActive': true
        });
        if (employee) return done(null, employee);
        else return done(null, false);
    }));
};
