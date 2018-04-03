module.exports.onlyAlphaAndSpaces = function(v) {
    return /^[a-zA-Z\s]+$/.test(v);
};

module.exports.alphaSpacesDots = function(v) {
    return /^[a-zA-Z.\s]+$/.test(v);
}

module.exports.onlyNumbers = function(v) {
    return /^[0-9]+$/.test(v);
};

module.exports.onlyAlphaAndNumbersAndSpaces = function(v) {
    return /^(?![0-9])[a-zA-Z0-9\s.,]+$/.test(v);
};

module.exports.passwords = function(v) {
    return /^(?=.{6,}$)(?![0-9!#$.,])[a-zA-Z0-9!#$.,]+$/.test(v);
};

module.exports.cards = function(v) {
    return /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/.test(v);
};

module.exports.phoneNumbers = function(v) {
    return /^([0-9]{4})-([0-9]{7}$)/.test(v);
};

module.exports.email = function(v) {
    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v);
};

module.exports.address = function(v) {
    return /^[a-zA-Z0-9.\s]+$/.test(v);
};

module.exports.rif = function(v) {
    return /^([VEJPGvejpg])-([0-9]{8})-([0-9]$)/.test(v);
};

module.exports.cedula = function(v) {
    return /^([VEJPvejpg])-([0-9]{7,9}$)/.test(v);
};

module.exports.price = function(v) {
    return /^([0-9.]+)$/.test(v);
};

module.exports.size = function(v) {
    return /^([0-9]+).([0-9]+)x([0-9]+).([0-9]+)/.test(v);
};

module.exports.expDate = function(v) {
    return /^(1[0-2]|0[1-9]|\d)\/(20\d{2}|19\d{2}|0(?!0)\d|[1-9]\d)$/.test(v)
};