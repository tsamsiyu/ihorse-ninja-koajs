import NodeCache from 'node-cache';

export default function (app, cb) {
    app.runCache = new NodeCache({
        stdTTl: 0,
        checkperiod: 0,
        errorOnMissing: false,
        useClones: false
    });
    cb();
};