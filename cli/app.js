import loggerInitializer from 'initializers/logger-initializer';
import mongooseInitializer from 'initializers/mongoose-initializer';
import mongoose from 'components/mongoose';
import seed from './seed';

export default function (config, command) {
    const app = {config, end: config.env};

    loggerInitializer(app);
    mongooseInitializer(app);

    if (command === 'seed') {
        seed();
    }

    mongoose.disconnect();
}