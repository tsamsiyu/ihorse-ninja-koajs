import validation from 'components/validation';
import User from 'pods/users/user';

export default function (attributes) {
    return new Promise((resolve, reject) => {
        const constraints = {
            email: {presence: true, email: true},
            password: {presence: true, length: {minimum: 6}},
        };

        const onValidated = () => {
            User.findOne({
                email: attributes.email
            }, (err, user) => {
                if (err) {
                    reject(err);
                } else if (user) {
                    if (user.encryptPassword(attributes.password) === user.hashedPassword) {
                        resolve({user});
                    } else {
                        resolve({errors: {password: ['Such user does not exist']}});
                    }
                } else {
                    resolve({errors: {email: ['Such user does not exist']}});
                }
            });
        };

        const onInvalidated = (errors) => {
            resolve({errors});
        };

        validation.async(attributes, constraints).then(onValidated, onInvalidated);
    });
};