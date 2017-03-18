import Data from 'components/data';

export default function (router) {
    router.options('/countries', async (ctx) => {
        ctx.body = 'ok';
    });

    router.get('/countries', async (ctx) => {
        const ssd = ctx.app.semiStaticData;
        const countries = await ssd.get('countries');
        ctx.body = Data.specificate(countries).polisher('mongoose');
    });
};