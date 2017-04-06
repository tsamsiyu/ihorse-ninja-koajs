import mongoose from 'mongoose';

export default function (app, cb) {
    const mongooseConfig = app.config.mongoose;
    const logger = app.logger;
    mongoose.Promise = Promise;
    mongoose.connect(mongooseConfig.uri, (error) => {
        if (error) {
            logger.error("Can't connect to mongodb");
            cb(error);
        } else {
            logger.info(`Connected to mongodb on address: '${mongooseConfig.uri}'`);
            cb();
        }
    });
};
