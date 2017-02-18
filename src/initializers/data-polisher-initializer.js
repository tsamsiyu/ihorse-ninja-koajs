import DataPolisher from 'components/data/polishers/simple-polisher';
import mongoose from 'components/mongoose';

export default function (app) {
    DataPolisher.register('date', {
        formatField(value, object, key) {
            if (value instanceof Date) {
                return value.toUTCString();
            }
        }
    });

    DataPolisher.register('mongoose', {
        ignored: ['__v'],
        id: '_id',
        toPlainObject(item) {
            return item.toObject();
        },
        merge: 'date'
    });

    DataPolisher.register('user', {
        ignored: ['authKey', 'hashedPassword', 'authToken', 'salt'],
        merge: 'mongoose',
    });
};