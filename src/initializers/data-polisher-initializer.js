import DataPolisher from 'components/data/polishers/simple-polisher';
import mongoose from 'components/mongoose';
import { ObjectID } from 'mongodb';

const { Schema } = mongoose;

export default function (app, cb) {
    DataPolisher.register('date', {
        formatField(value, object, key) {
            if (value instanceof Date) {
                return value.toUTCString();
            }
        }
    });

    function modelToPlainHash(hash) {
        Object.keys(hash).forEach((k) => {
            let val = hash[k];
            if (val instanceof ObjectID) {
                val = String(val);
            } else if (Array.isArray(val)) {
                val.forEach((item, k) => {
                    val[k] = modelToPlainHash(item);
                });
            } else if (typeof val === 'object') {
                val = modelToPlainHash(val);
            }
            hash[k] = val;
        });
        return hash;
    }

    function modelToPlain(model) {
        const hash = model.toObject({
            versionKey: false
        });
        return modelToPlainHash(hash);
    }

    DataPolisher.register('mongoose', {
        id: '_id',
        toPlainObject(item) {
            return modelToPlain(item);
        },
        merge: 'date'
    });

    DataPolisher.register('user', {
        ignored: ['authKey', 'hashedPassword', 'authToken', 'salt'],
        merge: 'mongoose',
    });

    cb();
};