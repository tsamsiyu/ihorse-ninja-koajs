import {serialize} from 'components/data/formatters/jao';
import {first} from 'utils/enum';
import _ from 'components/lodash';
import DataPolisher from 'components/data/polishers/simple-polisher';
import mongoose from 'components/mongoose';

export default function Data(data, options) {
    this.data = data;
    this.options = Object.assign({
        sameType: true,
        type: null,
        throughBefore: [],
        throughAfter: [],
        polishers: []
    }, options);
}

Data.specificate = function (data, type) {
    return new Data(data, {type});
};

Data.prototype.serialize = function () {
    const data = this.buildData();
    const options = this.buildSerializationOptions();
    return serialize(data, options);
};

Data.prototype.buildSerializationOptions = function () {
    return {
        type: this.getType()
    };
};

Data.prototype.polish = function () {
    if (this.options.polishers.length) {
        return _.flatten(this.options.polishers.map((polisher) => {
            if (Array.isArray(this.data)) {
                return this.data.map((item) => {
                    return DataPolisher.polish(polisher, item);
                });
            } else {
                return DataPolisher.polish(polisher, this.data);
            }
        }));
    }
    return _.cloneDeep(this.data);
};

Data.prototype.buildData = function () {
    this.options.throughBefore.forEach((stream) => {
        this.data = stream(this.data);
    });
    let data = this.polish();
    this.options.throughAfter.forEach((stream) => {
        data = stream(data);
    });
    return data;
};

Data.prototype.getType = function (data) {
    data = data ? data : this.data;
    if (this.options.type) {
        return this.options.type;
    } else if (data instanceof mongoose.Model) {
        return data.collection.name;
    } else if (Array.isArray(data) && data.length && this.options.sameType) {
        return this.getType(first(data));
    }
    return null;
};

Data.prototype.pass = function (cb) {
    return cb.call(null, this);
};

Data.prototype.polisher = function (name) {
    this.options.polishers.push(name);
    return this;
};

Data.prototype.sameType = function () {
    this.options.sameType = true;
    return this;
};

Data.prototype.throughBefore = function (cb) {
    this.options.throughBefore.push(cb);
    return this;
};