const User = require('../Abstracts/user.abstract');
const ClientModel = require('../Models/client.model');

class ClientController extends User {
    constructor() {
        super(ClientModel);
    }
}

module.exports = ClientController;