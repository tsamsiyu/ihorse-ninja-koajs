import mongoose from 'components/mongoose';
import {marksIndexes} from 'data/car/marks';
import {bodyTypesIndexes} from 'data/car/body-types';
import {countriesIndexes} from 'data/car/countries';
import {fuelsIndexes} from 'data/car/fuels';
import {ppcTypesIndexes} from 'data/car/fuels';
import {wheelDriveIndexes} from 'data/car/attributes';

const {Schema} = mongoose;

const schema = new Schema({
    mark                        : {type: Number, required: true, enum: marksIndexes},
    model                       : {type: String, required: true},
    userId                      : {type: Number, required: true},
    mileage                     : {type: Number, required: true},
    manufactureYear             : {type: Number, required: true},
    price                       : {type: Number, required: true},
    bodyType                    : {type: Number, required: true, enum: bodyTypesIndexes},
    manufactureCountry          : {type: Number, required: true, enum: countriesIndexes},
    locationCountry             : {type: Number, enum: countriesIndexes},
    customsClearanceCountry     : {type: Number, enum: countriesIndexes},
    negotiation                 : {type: Boolean, default: false},
    wasBroken                   : {type: Boolean, default: false},
    canGo                       : {type: Boolean, default: true},
    inCredit                    : {type: Boolean, default: false},
    isNotPainted                : {type: Boolean, default: true},
    canBeDrivenOnTheOrder       : {type: Boolean, default: false},
    fuels                       : [{type: String, enum: fuelsIndexes}],
    wheelDrive                  : {type: String, enum: wheelDriveIndexes},
    ppc                         : {type: Number, enum: ppcTypesIndexes},
    region                      : String,
    vEngine                     : Number,
    isFirstOwner                : Boolean,
    vinCode                     : String,
    color                       : String,
    photos                      : [String],
}, {
    timestamps : true
});

schema.virtual('equipment', {
    ref:            'CarEquipment',
    localField:     '_id',
    foreignField:   'ad'
});

export default mongoose.model('CarAd', schema);