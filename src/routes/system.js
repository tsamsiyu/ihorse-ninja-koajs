import async from 'async';
import {mapFor, first} from 'utils/enum';
import flatten from 'lodash/flatten';
import Data from 'components/data';

export default function (router) {
    router.options('/semi-static-data', async (ctx) => {
        ctx.body = 'ok';
    });

    router.get('/semi-static-data', async (ctx, next) => {
        if (typeof ctx.query === 'object') {
            const semiStaticData = ctx.app.semiStaticData;
            const dataResolvers = mapFor(ctx.query, (value, name) => {
                if (semiStaticData.has(name)) {
                    const lastUpdate = semiStaticData.getUpdateTime(name);
                    const time = parseFloat(value);
                    if (!isNaN(time) && (!lastUpdate || time < lastUpdate.getTime())) {
                        return async.asyncify(async () => {
                            return await semiStaticData.get(name);
                        });
                    }
                }
            });

            ctx.body = await new Promise((resolve, reject) => {
                async.parallel(dataResolvers, (err, dataList) => {
                    if (err) {
                        reject(err);
                    } else {
                        Data.specificate(dataList)
                            .sameType()
                            .polisher('mongoose')
                            .throughBefore(flatten)
                            .pass(resolve);
                    }
                });
            });
        }
    });
};