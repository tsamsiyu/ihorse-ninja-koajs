export default async (ctx, next) => {
    await next();
    const data = ctx.app.runCache.getLastUpdatedTimes(['marks']);
    ctx.res.setHeader("Static-Resources-Updated-Times", JSON.stringify(data));
}