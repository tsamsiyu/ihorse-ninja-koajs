import {serialize} from 'components/jao/serializer';
import mongoose from 'components/mongoose';
import MongooseDataPolisher from 'components/data-polisher';
import Serializable from 'components/jao/serializable';

export default async (ctx, next) => {
    await next();
    if (ctx.body instanceof mongoose.Model) {
        ctx.body = MongooseDataPolisher.polish(ctx.body);
    }
    if (ctx.body instanceof Serializable) {
        ctx.body = serialize(ctx.body.hash, {
            type: ctx.body.type
        });
    }
};