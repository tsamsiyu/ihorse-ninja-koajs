import {DataPolisher} from 'components/data-polisher';

export default function (app) {
    DataPolisher.register('mongoose', {
        ignored: '__v',
        id: '_id'
    });

    DataPolisher.register('mongoose:user', {
        ignored: ['authKey', 'hashedPassword', 'authToken', 'salt']
    }, (data) => {
        // return data instanceof User
        // TODO: here or in initializer ?
    });
};