import mongoose from 'mongoose';

const {Schema} = mongoose;

const schema = new Schema({
    firstName: String,
    lastName: String,
    birthday: Date,
    userId: Schema.Types.ObjectId,
});

export default UsersProvider.model('Profile', schema);