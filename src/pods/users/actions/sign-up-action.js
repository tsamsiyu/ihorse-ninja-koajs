import validation from 'components/validation';
import User from 'pods/users/user';

export default function (attributes) {
    return new Promise((resolve, reject) => {
        const constraints = {
            email: {presence: true, email: true, unique: 'users'},
            password: {presence: true, length: {minimum: 6}},
            passwordRepeat: {presence: true, equality: 'password'}
        };

        const onValidated = (validatedAttributes) => {
            const user = new User;
            user.generateAuthToken();
            user.assign(validatedAttributes, ['email', 'password']);
            user.save((err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve({user});
                }
            });
        };

        const onInvalidated = (errors) => {
            resolve({errors});
        };

        validation.async(attributes, constraints).then(onValidated, onInvalidated);
    });
};