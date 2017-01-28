import {serializeObject, serializeArray} from 'components/jao/serializer';
import mongoose from 'components/mongoose';

export default async (ctx, next) => {
    await next();
    if (ctx.body instanceof mongoose.Model) {
        ctx.body = serializeObject(ctx.body);
    }
};