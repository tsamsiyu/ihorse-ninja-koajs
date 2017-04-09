import {serialize} from 'components/data/formatters/jao';
import {first} from 'utils/enum';
import _ from 'components/lodash';
import DataPolisher from 'components/data/polishers/simple-polisher';
import mongoose from 'components/mongoose';
import Errors from 'components/data/errors';
import Serializable from 'components/data/serializable';

export default class Data extends Serializable {
    constructor(data, options) {
        super();
        this.data = data;
        this.options = Object.assign({
            sameType: true,
            type: null,
            throughBefore: [],
            throughAfter: [],
            polishers: []
        }, options);
    }
}

Data.Errors = Errors;

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

Data.prototype.polish = function (data) {
    this.options.polishers.forEach(([polisher, changes]) => {
        data = this.polishItem(polisher, data, changes);
    });
    return data;
};

Data.prototype.polishItem = function (polisher, item, changes) {
    if (Array.isArray(item)) {
        item.forEach((element, k) => {
            element[k] = this.polishItem(polisher, element, changes);
        });
    } else {
        item = DataPolisher.polish(polisher, item, changes);
    }
    return item;
};

Data.prototype.buildData = function () {
    let data = _.cloneDeep(this.data);
    this.options.throughBefore.forEach((stream) => {
        data = stream(data);
    });
    data = this.polish(data);
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
        return _.singularize(data.collection.name);
    } else if (Array.isArray(data) && data.length && this.options.sameType) {
        return this.getType(first(data));
    }
    return null;
};

Data.prototype.pass = function (cb) {
    return cb.call(null, this);
};

Data.prototype.polisher = function (name, changes) {
    this.options.polishers.push([name, changes]);
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