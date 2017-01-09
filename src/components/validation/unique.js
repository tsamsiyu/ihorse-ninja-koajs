var mongoose        = require('./../mongoose');
var connStates      = require('mongoose/lib/connectionstate');

var uniqueValidator = function (value, options, field, hash) {
    var collectionName, collectionField;
    var isOptionsObject = options instanceof Object;

    if (isOptionsObject && options.collection) {
        collectionName = options.collection;
    } else if (typeof options === 'string') {
        collectionName = options;
    } else if (hash.constructor.collection) {
        collectionName = hash.constructor.collection.collectionName;
    } else {
        throw new Error('Collection name must be specified for unique validator');
    }

    if (isOptionsObject && options.field) {
        collectionField = options.field;
    } else {
        collectionField = field;
    }

    return new Promise(function (resolve, reject) {
        if (!value) resolve();
        var conditions = {};
        conditions[collectionField] = value;

        try {
            if (mongoose.connection.readyState == connStates.connected) {
                _mustUnique(resolve, collectionName, conditions);
            } else {
                mongoose.connection.once('open', function () {
                    _mustUnique(resolve, collectionName, conditions);
                });
            }
        } catch (e) {
            resolve('was broken')
        }
    });
};

var _mustUnique = function (resolve, collectionName, conditions) {
    var db = mongoose.connection.db;
    db.collection(collectionName, function (err, collection) {
        collection.count(conditions, function (err, cnt) {
            if (err) {
                resolve('cannot be checked, sorry');
            } else {
                if (cnt) {
                    resolve('already exists');
                } else {
                    resolve();
                }
            }
        });
    });
};

module.exports = uniqueValidator;