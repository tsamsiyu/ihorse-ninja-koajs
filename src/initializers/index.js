import loggerInitializer from 'initializers/logger-initializer';
import mongooseInitializer from 'initializers/mongoose-initializer';
import cacheInitializer from 'initializers/cache-initializer';
import semiStaticDataInitializer from 'initializers/semi-static-data-initializer';
import dataManagerInitializer from 'initializers/data-manager-initializer';
import dataPolisherInitializer from 'initializers/data-polisher-initializer';

export default function (app, start) {
    loggerInitializer(app);
    mongooseInitializer(app);
    cacheInitializer(app);
    semiStaticDataInitializer(app);
    dataPolisherInitializer(app);
    dataManagerInitializer(app);
    start();
};