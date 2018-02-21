const userAbstract = require('../Abstracts/user.abstract');
const ClientModel = require('../Models/client.model');

class ClientController extends userAbstract {
    async create(req, res) {
        const client = new ClientModel({
            'businessName': req.body.businessName,
            'ownerName': req.body.ownerName,
            'rif': req.body.rif,
            'address': req.body.address,
            'tlpNumber': req.body.tlpNumber,
        });
        client.hashedPassword = await client.encryptPassword(req.body.password);
        await client.save();
        res
            .status(201)
            .json(client);
    }
    async login(req, res) {
        const client = await ClientModel.findOne({
            'businessName': req.body.businessName
        });
        console.log(client);
        if(await client.checkPassword(req.body.password)) {
            res
                .status(200)
                .json({
                    'message': 'Logueado'
                })
        } else {
            res
                .status(401)
                .json({
                    'message': 'No logueado'
                })
        }
    }

}

module.exports = ClientController;