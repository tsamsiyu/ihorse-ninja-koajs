export default function SemiStaticData(cache) {
    this._cache = cache;
    this._sources = {};
    this._updates = {};
}

SemiStaticData.prototype.register = function (model) {
    this._sources[model.collection.name] = model;
};

SemiStaticData.prototype.resolve = function (name) {
    return this._sources[name].find().exec();
};

SemiStaticData.prototype.cacheKey = function (name) {
    return `semi-static_${name}`;
};

SemiStaticData.prototype.has = function (name) {
    return Boolean(this._sources[name]);
};

SemiStaticData.prototype.get = function (name) {
    return new Promise((resolve, reject) => {
        if (this.has(name)) {
            const cacheKey = this.cacheKey(name);
            const existedValue = this._cache.get(cacheKey);
            if (existedValue) {
                resolve(existedValue);
            } else {
                this.resolve(name).then((data) => {
                    this._cache.set(cacheKey, data);
                    resolve(data);
                }, reject);
            }
        } else {
            reject('Unexpected semi-static data');
        }
    });
};

SemiStaticData.prototype.getUpdateTime = function (key) {
    return this._updates[key];
};

SemiStaticData.prototype.getUpdates = function () {
    return Object.keys(this._sources).map((name) => {
        return {
            name,
            time: this.getUpdateTime(name) || 0
        }
    });
};