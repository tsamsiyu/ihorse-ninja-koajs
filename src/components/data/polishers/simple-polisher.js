import _ from 'lodash';
import {isScalarType} from 'utils/routine';

export default function DataPolisher(spec = {}) {
    this.spec = this.constructor.handleSpec(spec);
}

DataPolisher._specs = {};
DataPolisher.register = function (name, spec) {
    if (spec instanceof DataPolisher) {
        this._specs[name] = spec;
    } else {
        this._specs[name] = new DataPolisher(spec);
    }
};

DataPolisher.has = function (name) {
    return Boolean(this._specs[name]);
};

DataPolisher.get = function (name) {
    return this._specs[name];
};

DataPolisher.polish = function (name, data, changes) {
    if (this.has(name)) {
        if (changes) {
            const spec = _.merge({}, this.get(name).spec, changes);
            const polisher = new DataPolisher(spec);
            return polisher.polish(data);
        } else {
            return this.get(name, changes).polish(data);
        }
    }
};

DataPolisher.find = function (data) {
    return _.find(Object.keys(this._specs), (k) => {
        if (typeof this._specs[k].spec.applyTo === 'function') {
            return this._specs[k].spec.applyTo.call(null, data);
        }
    });
};

DataPolisher.handleSpec = function (spec) {
    let newSpec;
    if (typeof spec === 'object' && spec.merge) {
        spec.merge = Array.isArray(spec.merge) ? spec.merge : [spec.merge];
        newSpec = {};
        spec.merge.forEach((mergeItem) => {
            _.assignIn(newSpec, this.get(mergeItem).spec, (objValue, srcValue) => {
                if (_.isArray(objValue)) {
                    return objValue.concat(srcValue);
                }
            });
        });
        _.assignIn(newSpec, spec, (objValue, srcValue) => {
            if (_.isArray(objValue)) {
                return objValue.concat(srcValue);
            }
        });
    } else {
        newSpec = _.merge({
            id: 'id',
            props: null,
            ignored: null,
            included: null
        }, spec || {});
    }
    // TODO: need review polisher creation\registration process
    if (newSpec.noignored) {
        newSpec.noignored = Array.isArray(newSpec.noignored) ? newSpec.noignored : [newSpec.noignored];
        if (newSpec.ignored) {
            newSpec.ignored = _.difference(newSpec.ignored, newSpec.noignored);
        }
        if (newSpec.props) {
            newSpec.props = _.difference(newSpec.props, newSpec.noignored);
        }
        delete newSpec.noignored;
    }
    if (newSpec.noincluded) {
        newSpec.noincluded = Array.isArray(newSpec.noincluded) ? newSpec.noincluded : [newSpec.noincluded];
        if (newSpec.included) {
            newSpec.included = _.difference(newSpec.included, newSpec.noincluded);
        }
        delete newSpec.noincluded;
    }
    if (newSpec.noused) {
        newSpec.noused = Array.isArray(newSpec.noused) ? newSpec.noused : [newSpec.noused];
        if (newSpec.props) {
            newSpec.props = _.difference(newSpec.props, newSpec.noused);
        }
        delete newSpec.noused;
    }
    return newSpec;
};

// PROTOTYPE

DataPolisher.prototype._diffFor = function (list, key, cb) {
    if (Array.isArray(this.spec[key]) && this.spec[key].length) {
        if (typeof cb !== 'function' || cb()) {
            list = Array.isArray(list) ? list : [list];
            this.spec[key] = _.difference(this.spec[key], list);
        }
    }
};

DataPolisher.prototype._addFor = function (list, key, reset, cb) {
    if (typeof cb !== 'function' || cb()) {
        list = Array.isArray(list) ? list : [list];
        if (reset) {
            this.spec[key] = list;
        } else {
            if (!this.spec[key]) {
                this.spec[key] = list;
            } else {
                this.spec[key] = this.spec[key].concat(list);
            }
        }
    }
};

DataPolisher.prototype.id = function (id) {
    this.spec.id = id;
};

DataPolisher.prototype.use = function (list, reset = false, cb) {
    this._addFor(list, 'props', reset, cb);
    return this;
};

DataPolisher.prototype.ignore = function (list, reset = false, cb) {
    this._addFor(list, 'ignored', reset, cb);
    return this;
};

DataPolisher.prototype.include = function (list, reset = false, cb) {
    this._addFor(list, 'included', reset, cb);
    return this;
};

DataPolisher.prototype.nouse = function (list, cb) {
    this._diffFor(list, 'props', cb);
    return this;
};

DataPolisher.prototype.noignore = function (list, cb) {
    this._diffFor(list, 'ignored', cb);
    return this;
};

DataPolisher.prototype.noinclude = function (list, cb) {
    this._diffFor(list, 'included', cb);
    return this;
};

DataPolisher.prototype.isAllowed = function (key) {
    if (Array.isArray(this.spec.ignored) && this.spec.ignored.length && this.spec.ignored.includes(key)) {
        return false;
    } else if (Array.isArray(this.spec.props)) {
        return this.spec.props.includes(key);
    }
    return true;
};

DataPolisher.prototype.isId = function (key) {
    return key === this.spec.id;
};

DataPolisher.prototype.polish = function (data) {
    let res = data;
    if (typeof this.spec.before === 'string') {
        this.spec.before = [this.spec.before];
    }
    if (Array.isArray(this.spec.before)) {
        this.spec.before.forEach((polisherName) => {
            res = this.constructor.polish(polisherName, res);
        });
    }

    if (Array.isArray(res)) {
        res = this.polishArray(res);
    } else {
        res = this.polishObject(res);
    }

    if (typeof this.spec.after === 'string') {
        this.spec.after = [this.spec.after];
    }
    if (Array.isArray(this.spec.after)) {
        this.spec.after.forEach((polisherName) => {
            res = this.constructor.polish(polisherName, res);
        });
    }
    return res;
};

DataPolisher.prototype.toScalar = function (value) {
    return value !== undefined ? value.toString() : undefined;
};

DataPolisher.prototype.toPlainObject = function (object) {
    if (this.spec.toPlainObject instanceof Function) {
        return this.spec.toPlainObject.call(null, object);
    }
    return object;
};

DataPolisher.prototype.polishObject = function (object, parentKey) {
    const polishedObject = {};
    const handledObject = this.toPlainObject(object);
    _.forEach(handledObject, (item, key) => {
        if (this.isId(key)) {
            polishedObject.id = this.toScalar(item, key);
        } else {
            const varWay = parentKey ? `${parentKey}.${key}` : key;
            if (this.isAllowed(varWay)) {
                if (this.spec.formatField instanceof Function) {
                    const formatted = this.spec.formatField.call(null, item, handledObject, key);
                    if (formatted) {
                        polishedObject[key] = formatted;
                        return;
                    }
                }
                if (item !== undefined) {
                    if (isScalarType(item)) {
                        polishedObject[key] = this.toScalar(item, key);
                    } else if (Array.isArray(item)) {
                        polishedObject[key] = this.polishArray(item, varWay);
                    } else if (typeof item === 'object') {
                        polishedObject[key] = this.polishObject(item, varWay);
                    }
                }
            }
        }
    });
    return polishedObject;
};

DataPolisher.prototype.polishArray = function (list, varWay) {
    return list.map((item) => {
        return this.polishObject(item, varWay);
    });
};