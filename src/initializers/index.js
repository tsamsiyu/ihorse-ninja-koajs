import loggerInitializer from 'initializers/logger-initializer';
import mongooseInitializer from 'initializers/mongoose-initializer';
import cacheInitializer from 'initializers/cache-initializer';
import semiStaticDataInitializer from 'initializers/semi-static-data-initializer';

export default function (app, start) {
    loggerInitializer(app);
    mongooseInitializer(app);
    cacheInitializer(app);
    semiStaticDataInitializer(app);
    start();
};