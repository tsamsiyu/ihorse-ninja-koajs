import NodeCache from 'components/cache';

export default function (app) {
    app.runCache = new NodeCache({
        stdTTl: 0,
        checkperiod: 0,
        errorOnMissing: false,
        useClones: false
    });
};