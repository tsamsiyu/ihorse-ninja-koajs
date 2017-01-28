import mongoose from 'components/mongoose';
import crypto from 'crypto';

const {Schema} = mongoose;

const schema = new Schema({
    username: {type: String, unique: true, sparse: true, trim: true, index: true},
    email: {type: String, required: true, unique: true, trim: true, index: true},
    hashedPassword: {type: String, required: true},
    authToken: {type: String, required: true},
    salt: {type: String, required: true},
    createdAt: {type: Date, default: Date.now}
});

schema.methods.encryptPassword = function (password) {
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

schema.methods.generateAuthToken = function () {
    this.authToken = crypto.randomBytes(32).toString('hex');
};

schema.virtual('password')
    .set(function (password) {
        this._plainPassword = password;
        this.salt = Math.random() + '';
        this.hashedPassword = this.encryptPassword(password);
    })
    .get(function () {
        return this._plainPassword;
    });

schema.virtual('profile', {
    ref: 'Profile',
    localField: '_id',
    foreignField: 'userId'
});

export default mongoose.model('User', schema);
