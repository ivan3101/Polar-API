const userAbstract = require('../Abstracts/user.abstract');
const ClientModel = require('../Models/client.model');
const Bluebird = require('bluebird');
const JwtSign = Bluebird.Promise.promisify(require('jsonwebtoken').sign);
const Secret = require('../Config/secret');

class ClientController extends userAbstract {
    async create(req, res) {
        const client = new ClientModel(req.body);
        client.hashedPassword = await client.encryptPassword(req.body.password);
        await client.save();
        res
            .status(201)
            .json(client);
    }

    async login(req, res) {
        const client = await ClientModel.findOne({
            'businessName': req.body.businessName,
            'isActive': true
        });
        if(await client.checkPassword(req.body.password)) {
           const token = await JwtSign(client.toJSON(), Secret.secret);
           if (token) {
                res
                    .status(200)
                    .json({
                        'client': client,
                        'token': token
                    })
           }
        } else {
            res
                .status(401)
                .json({
                    'message': 'No logueado'
                })
        }
    }

    async modify(req, res) {
        const clientId = req.params.clientId;
        await ClientModel.update({
            '_id': clientId,
            'isActive': true
        }, { $set: req.body });
        res
            .status(204)
            .json();
    }

    async delete(req, res) {
        const clientId = req.params.clientId;
        await ClientModel.update({
            '_id': clientId,
            'isActive': true
        }, { $set: { 'isActive': false } });
        res
            .status(204)
            .json();
    }

    static async getAllClients(req, res) {
        const quantity = req.query.quantity || 10;
        const page = req.query.page || 1;
        const clients = await ClientModel.find({
            'isActive': true
        })
            .skip((quantity * page) - quantity)
            .limit(+quantity);
        res
            .status(200)
            .json(clients);
    }

    static async getSingleClient(req, res) {
        const clientId = req.params.clientId;
        const client = await ClientModel.findOne({
            '_id': clientId,
            'isActive': true
        });
        res
            .status(200)
            .json(client);
    }
}

module.exports = ClientController;