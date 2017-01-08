import moment from 'moment';

export default async (ctx, next) => {
    const logger = ctx.app.logger;

    const startDate = moment();
    const fulldate = startDate.format('YYYY-MM-DD HH-mm-ss ms');
    logger.info(`Request was initiated at ${fulldate}`);
    await next();
    const endDate = moment();
    const rangeTime = endDate.diff(startDate);
    logger.info(`Handling finished in ${rangeTime} milliseconds`);
};