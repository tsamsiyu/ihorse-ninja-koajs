import NodeCache from 'node-cache';

NodeCache.prototype._updatedTime = {};
NodeCache.prototype.getLastUpdatedTime = function (key) {
    return this._updatedTime[key];
};

NodeCache.prototype.getLastUpdatedTimes = function (attributes) {
    return attributes.map((item) => {
        console.log({name: item, time: this.getLastUpdatedTime(item)});
        return {
            name: item,
            time: this.getLastUpdatedTime(item) || 0
        }
    });
};

const prevSet = NodeCache.prototype.set;
NodeCache.prototype.set = function (key) {
    this._updatedTime[key] = new Date();
    return prevSet.apply(this, arguments);
};

NodeCache.prototype.provide = function (key, provider) {
    return new Promise((resolve, reject) => {
        const existedValue = this.get(key);
        if (existedValue) {
            resolve(existedValue);
        } else {
            provider().then((data) => {
                this.set(key, data);
                resolve(data);
            });
        }
    });
};

export default NodeCache;