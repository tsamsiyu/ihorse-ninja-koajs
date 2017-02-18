import Data from 'components/data';

export default async (ctx, next) => {
    await next();
    if (ctx.body instanceof Data) {
        ctx.body = ctx.body.serialize();
    }
};