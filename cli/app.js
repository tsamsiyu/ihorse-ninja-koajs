import loggerInitializer from 'initializers/logger-initializer';
import mongooseInitializer from 'initializers/mongoose-initializer';
import mongoose from 'components/mongoose';
import seed from './seed';
import async from 'async';

export default function (config, command) {
    const app = {config, env: config.env};

    const initializers = [
        loggerInitializer,
        mongooseInitializer
    ].map((initializer) => {
        return (cb) => initializer(app, cb);
    });

    async.series(initializers, (err) => {
        if (!err) {
            if (command === 'seed') {
                seed(app, () => {
                    mongoose.disconnect();
                });
            }
        }
    });
}