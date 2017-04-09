import DataPolisher from 'components/data/polishers/simple-polisher';
import mongoose from 'components/mongoose';

export default function (app, cb) {
    DataPolisher.register('date', {
        formatField(value, object, key) {
            if (value instanceof Date) {
                return value.toUTCString();
            }
        }
    });

    DataPolisher.register('mongoose', {
        id: '_id',
        toPlainObject(item) {
            return item.toObject({
                versionKey: false
            });
        },
        merge: 'date'
    });

    DataPolisher.register('user', {
        ignored: ['authKey', 'hashedPassword', 'authToken', 'salt'],
        merge: 'mongoose',
    });

    cb();
};