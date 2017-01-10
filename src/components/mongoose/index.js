import mongoose from 'mongoose';
import _ from 'components/lodash';

const {Model} = mongoose;

Model.prototype.assign = function (data, safeKeys) {
    const safeData = _.assignSafe(data, safeKeys);
    _.assign(this, safeData);
    return this;
};

Model.prototype.pick = function (keys) {
    return _.pick(this, keys);
};

export default mongoose;