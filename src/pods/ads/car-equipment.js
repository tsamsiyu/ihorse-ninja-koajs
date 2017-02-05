import mongoose from 'components/mongoose';

const {Schema} = mongoose;

const schema = new Schema({
    ad                      : {type: Schema.Types.ObjectId, ref: 'CarAd'},
    airbag                  : {type: Boolean},
    armored                 : {type: Boolean},
    sunroof                 : {type: Boolean},
    parkingSensors          : {type: Boolean},
    heatedWindshield        : {type: Boolean},
    powerWindows            : {type: Boolean},
    closersWindows          : {type: Boolean}
});

export default mongoose.model('CarEquipment', schema);