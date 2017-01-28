import moment from 'moment';

export default async (ctx, next) => {
    const logger = ctx.app.logger;

    const startDate = moment();
    const fulldate = startDate.format('YYYY-MM-DD HH-mm-ss');
    logger.info(`Request '${ctx.req.method} ${ctx.req.url}' was initiated at ${fulldate}`);
    await next();
    const endDate = moment();
    const rangeTime = endDate.diff(startDate);
    logger.info(`Handling finished in ${rangeTime} milliseconds with status ${ctx.status}`);
};