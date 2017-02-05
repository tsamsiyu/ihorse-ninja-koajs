import mongoose from 'mongoose';

export default function (app) {
    const mongooseConfig = app.config.mongoose;
    const logger = app.logger;
    mongoose.Promise = Promise;
    mongoose.connect(mongooseConfig.uri, mongooseConfig.server, (error) => {
        if (error) {
            logger.error("Can't connect to mongodb");
            throw error;
        } else {
            logger.info(`Connected to mongodb on address: '${mongooseConfig.uri}'`);
        }
    });
};
