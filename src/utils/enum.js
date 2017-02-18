import _ from 'lodash';

export function mapFor(data, handleCb, whenCb) {
    whenCb = whenCb || ((item) => item !== undefined);
    const map = [];
    _.forEach(data, (val, key) => {
        const res = handleCb.call(null, val, key);
        if (whenCb.call(null, res)) {
            map.push(res);
        }
    });
    return map;
}

export function first(ary) {
    if (ary.length) {
        return ary[ary.length - 1];
    }
}