import DataPolisher from 'components/data-polisher';
import User from 'pods/users/user';
import mongoose from 'components/mongoose';

export default function (app) {
    DataPolisher.register('user', {
        ignored: ['authKey', 'hashedPassword', 'authToken', 'salt'],
        before: 'mongoose',
        applyTo(item) {
            return item instanceof User;
        }
    });

    DataPolisher.register('mongoose', {
        ignored: ['__v'],
        id: '_id',
        toPlainObject(item) {
            return item.toObject();
        },
        applyTo(item) {
            return item instanceof mongoose.Model;
        }
    });
};