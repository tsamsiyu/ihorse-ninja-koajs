import mongoose from 'components/mongoose';

const {Schema} = mongoose;

const schema = new Schema({
    name            : {type: String, unique: true, index: true, required: true},
    countryId       : {type: Schema.Types.ObjectId, ref: 'Country'},
});

export default mongoose.model('Mark', schema);
