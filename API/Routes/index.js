const Express = require('express');
const Router = Express.Router();

Router
    .route('/')
    .get((req, res) => {
        res
            .status(200)
            .json({
                'message': 'Hello world'
            });
});

module.exports = Router;