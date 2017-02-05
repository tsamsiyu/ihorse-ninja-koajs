import NodeCache from 'node-cache';

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