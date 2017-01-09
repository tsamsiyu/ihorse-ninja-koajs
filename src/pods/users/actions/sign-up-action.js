import validation from 'components/validation';
import User from 'pods/users/user';

export default async function (attributes) {
    const constraints = {
        email: {presence: true, email: true, unique: 'users'},
        login: {unique: 'users', length: {minimum: 2}},
        password: {presence: true, length: {minimum: 6}},
        passwordRepeat: {presence: true, equality: 'password'},
        firstName: {length: {minimum: 2}},
        lastName: {length: {minimum: 2}},
        birthday: {date: {earliest: true}}
    };

    const isValid = await validation.async(attributes, constraints);

    if (isValid) {
        // const user = new User;
        // user.fill(attributes, ['login', 'email', 'password']);
        // user.generateAuthToken();
        //
        // const profile = new Profile;
        // profile.fill(attributes, ['firstName', 'lastName', 'birthday']);
        //
        // user.save(function (uErr, uModel, uAffected) {
        //     if (uErr) return cb(uErr);
        //     profile.set('userId', user.get('_id')).save((pErr, profile) => {
        //         cb(pErr, user);
        //     });
        // });
    }
};