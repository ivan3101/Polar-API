const Bluebird = require('bluebird');
const JwtSign = Bluebird.Promise.promisify(require('jsonwebtoken').sign);
const Secret = require('../Config/secret');
const Autobind = require('auto-bind-inheritance');

class User {
    constructor(mongooseModel) {
        Autobind(this);
        this.mongooseModel = mongooseModel;
    }

    async create(req, res) {
        const document = new this.mongooseModel(req.body);
        document.hashedPassword = await document.encryptPassword(req.body.password);
        await document.save();
        res
            .status(201)
            .json(document);
    }

    async login(req, res) {
        const document = await this.mongooseModel.findOne({
            'email': req.body.email,
            'isActive': true
        });
        if(await document.checkPassword(req.body.password)) {
            const token = await JwtSign(document.toJSON(), Secret.secret);
            if (token) {
                res
                    .status(200)
                    .json({
                        'user': document,
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
        const documentId = req.params.id;
        await this.mongooseModel.update({
            '_id': documentId,
            'isActive': true
        }, { $set: req.body });
        res
            .status(204)
            .json();
    }

    async delete(req, res) {
        const documentId = req.params.id;
        await this.mongooseModel.update({
            '_id': documentId,
            'isActive': true
        }, { $set: { 'isActive': false } });
        res
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
        res
            .status(200)
            .json(documents);
    }

    async getSingle(req, res) {
        const documentId = req.params.id;
        const document = await this.mongooseModel.findOne({
            '_id': documentId,
            'isActive': true
        });
        res
            .status(200)
            .json(document);
    }
}

module.exports = User;