const Client = require('../Models/client.model');

module.exports.addCard = async (req, res) => {
    const id = req.params.id;
    await Client.findOneAndUpdate({
        '_id': id
    },{
        '$push': {'payMethod': req.body}
    });
    return res
        .status(204)
        .json({
            'message': 'Metodo de pago agregado exitosamente'
        });
};

module.exports.getCards = async (req, res) => {
    const id = req.params.id;
    const cards = await Client.findOne({
       '_id': id
    }).select('payMethod -_id');
    return res
        .status(200)
        .json(cards.payMethod);
};

module.exports.deleteCard = async (req, res) => {
    const clientId = req.params.clientId;
    const cardId = req.params.cardId;
    await Client.findOneAndUpdate({
        '_id': clientId
    },{
        $pull: {'payMethod': {'_id': cardId}}
    }).select('-_id');
    return res
        .status(204)
        .json({'message': 'Se ha borrado el metodo de pago'});
};