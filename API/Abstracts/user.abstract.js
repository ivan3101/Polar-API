const Bluebird = require('bluebird');
const JwtSign = Bluebird.Promise.promisify(require('jsonwebtoken').sign);
const Secret = require('../Config/secret');
const Autobind = require('auto-bind-inheritance');
const Boom = require('boom');

class User {
    constructor(mongooseModel) {
        Autobind(this);
        this.mongooseModel = mongooseModel;
    }

    async create(req, res) {
        const document = new this.mongooseModel(req.body);
        document.hashedPassword = await document.encryptPassword(req.body.password);
        await document.save();
        return res
            .status(201)
            .json(document);
    }

    async login(req, res) {
        const document = await this.mongooseModel.findOne({
            'email': req.body.email,
            'isActive': true
        });
        if (!document) throw Boom.unauthorized('Correo o contraseña incorrectos');
        if (await document.checkPassword(req.body.password)) {
            const token = await JwtSign(document.toJSON(), Secret.secret, {'expiresIn': '24h'});
            if (token) {
               return res
                    .status(200)
                    .json({
                        'user': document,
                        'token': token
                    })
            }
        } else {
            throw Boom.unauthorized('Correo o contraseña incorrectos');
        }
    }

    async modify(req, res) {
        const documentId = req.params.id;
        await this.mongooseModel.update({
            '_id': documentId,
            'isActive': true
        }, { $set: req.body });
        return res
            .status(204)
            .json();
    }

    async delete(req, res) {
        const documentId = req.params.id;
        await this.mongooseModel.update({
            '_id': documentId,
            'isActive': true
        }, { $set: { 'isActive': false } });
        return res
            .status(204)
            .json();
    }

    async getAll(req, res) {
        const quantity = 10;
        const page = req.query.page || 1;
        const documents = await this.mongooseModel.find({
            'isActive': true
        })
            .skip((quantity * page) - quantity)
            .limit(+quantity);
        if (!document.length) throw Boom.notFound('Recurso no encontrado');
        return res
            .status(200)
            .json(documents);
    }

    async getSingle(req, res) {
        const documentId = req.params.id;
        const document = await this.mongooseModel.findOne({
            '_id': documentId,
            'isActive': true
        });
        if (!document) throw Boom.notFound('Recurso no encontrado');
        return res
            .status(200)
            .json(document);
    }
}

module.exports = User;