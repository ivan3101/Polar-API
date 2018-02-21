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

}

module.exports = ClientController;