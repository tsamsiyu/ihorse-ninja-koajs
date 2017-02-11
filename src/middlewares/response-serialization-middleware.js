export default async (ctx, next) => {
    await next();
    if (ctx.rawBody) {
        ctx.body = ctx.app.serialize(ctx.rawBody);
    }
};