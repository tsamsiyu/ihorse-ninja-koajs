import Serializable from 'components/data/serializable';

export default async (ctx, next) => {
    await next();
    if (ctx.body instanceof Serializable) {
        ctx.body = ctx.body.serialize();
    }
    ctx.res.setHeader("Content-Type", "application/vnd.api+json.");
};