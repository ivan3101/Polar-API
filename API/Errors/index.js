const Boom = require('boom');

module.exports.handleAsyncExceptions = fn => (req, res, next) => {
    fn(req, res, next).catch((err) => {
        if (!err.isBoom) {
            console.log(err)
            if (err.name === 'ValidationError') {
                return next(err);
            } else if (err.name === 'TokenExpiredError') {
                return next(err);
            }
            else {
                return next(Boom.badImplementation(err));
            }
        }
        next(err);
    });
};

module.exports.unauthorizedError = (err, req, res, next) => {
    if (err.name === 'TokenExpiredError') {

    } else {
        next(err);
    }
};

module.exports.validationError = (err, req, res, next) => {
    if (err.name === "ValidationError") {
        return next(Boom.badData(err.errors[Object.keys(err.errors)[Object.keys(err.errors).length - 1]].message));
    } else {
        next(err);
    }
};

module.exports.errorHandler = (err, req, res, next) => {
    if (res.headersSent) return next(err);
    res
        .status(err.output.statusCode)
        .json(err.output);
};