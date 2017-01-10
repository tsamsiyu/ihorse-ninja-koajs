import mongoose from 'components/mongoose';
import connStates from'mongoose/lib/connectionstate';

const getCollectionName = function (options) {
    if (typeof options === 'object' && options.collection) {
        return options.collection;
    } else if (typeof options === 'string') {
        return options;
    } else {
        throw new Error('Collection name must be specified for unique validator');
    }
};

const getCollectionField = function (options) {
    if (typeof options === 'object' && options.field) {
        return options.field;
    }
};

const getFilter = function (options, field, value) {
    let filter;
    if (typeof options === 'object' && options.filter) {
        filter = options.filter;
    } else {
        filter = {};
    }
    filter[field] = value;
    return filter;
};

const checkCollectionUniqueness = function (collection, filter) {
    return new Promise((resolve, reject) => {
        collection.count(filter, function (err, cnt) {
            if (err) {
                reject(err);
            } else if (cnt) {
                resolve('already exists');
            } else {
                resolve();
            }
        });
    });
};

/**
 * Expects the opened mongoose connection
 *
 * @param {String} collectionName
 * @param {Object} filter
 */
const executeUniquenessQuery = function (collectionName, filter) {
    const db = mongoose.connection.db;
    return new Promise((resolve, reject) => {
        db.collection(collectionName, (err, collection) => {
            if (err) {
                reject(err);
            } else {
                checkCollectionUniqueness(collection, filter)
                    .then(resolve)
                    .catch(reject);
            }
        });
    });
};

const checkUniqueness = function (collectionName, filter) {
    return new Promise((resolve, reject) => {
        if (mongoose.connection.readyState == connStates.connected) {
            executeUniquenessQuery(collectionName, filter)
                .then(resolve)
                .catch(reject);
        } else {
            mongoose.connection.once('open', () => {
                executeUniquenessQuery(collectionName, filter)
                    .then(resolve)
                    .catch(reject);
            });
        }
    });
};

const optionValidator = function (value, options, field, hash) {
    if (!value) return;
    const collectionName = getCollectionName(options);
    const collectionField = getCollectionField(options) || field;
    const filter = getFilter(options, collectionField, value);
    return checkUniqueness(collectionName, filter);
};

export default optionValidator;