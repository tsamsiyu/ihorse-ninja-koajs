import {serialize} from 'components/data-format/jao';
import mongoose from 'components/mongoose';
import DataPolisher from 'components/data-polisher';

function supplyType(ctx) {
    if (ctx.bodyType) {
        return ctx.bodyType;
    } else if (ctx.rawBody instanceof mongoose.Model) {
        return ctx.rawBody.collection.name;
    }
}

function supplyPolisher(ctx) {
    if (ctx.polisher) {
        return ctx.polisher;
    } else  {
        return DataPolisher.find(ctx.rawBody);
    }
}

export default async (ctx, next) => {
    await next();
    if (ctx.rawBody) {
        const type = supplyType(ctx);
        if (type) {
            const polisher = supplyPolisher(ctx);
            let dataToSerialization = ctx.rawBody;
            if (polisher) {
                console.log('polisher', polisher);
                dataToSerialization = DataPolisher.polish(polisher, dataToSerialization);
            }
            ctx.body = serialize(dataToSerialization, {type});
        }
    }
};