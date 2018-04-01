const Client = require('../Models/client.model');
const Employee = require('../Models/employee.model');
const Secret = require('./secret');
const Bluebird = require('bluebird');
const Jwt = Bluebird.promisify(require('jsonwebtoken').verify);
const Boom = require('boom');

module.exports = async (req, res) => {
    const token = req.body.token;
    if (!token) throw Boom.unauthorized('No tiene permisos para acceder a esta area');
    const decodedToken = await Jwt(token, Secret.secret);
    const type = req.params.type;
    if (type === 'client') {
        const client = await Client
            .findOne({
                '_id': decodedToken._id,
                'isActive': true
            })
            .select('_id');
        if (client) return res.status(200).json({'status': true});
    } else if (type === 'employee') {
        const employee = await Employee
            .findOne({
                '_id': decodedToken._id,
                'isActive': true
            })
            .select('_id');
        if (employee) return res.status(200).json({'status': true});
    }
    throw Boom.unauthorized('No tiene permisos para acceder a esta area');
};