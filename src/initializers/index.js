import loggerInitializer from 'initializers/logger-initializer';
import mongooseInitializer from 'initializers/mongoose-initializer';
import cacheInitializer from 'initializers/cache-initializer';
import semiStaticDataInitializer from 'initializers/semi-static-data-initializer';
import dataPolisherInitializer from 'initializers/data-polisher-initializer';
import async from 'async';

export default function (app, start) {
    const initializers = [
        loggerInitializer,
        mongooseInitializer,
        cacheInitializer,
        semiStaticDataInitializer,
        dataPolisherInitializer
    ].map((initializer) => {
        return (cb) => initializer(app, cb)
    });

    async.series(initializers, () => {
        start();
    });
};