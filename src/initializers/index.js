import loggerInitializer from 'initializers/logger-initializer';
import mongooseInitializer from 'initializers/mongoose-initializer';

export default function (app, start) {
    loggerInitializer(app);
    mongooseInitializer(app);
    start();
};