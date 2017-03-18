import Data from 'components/data';

export default function (router) {
    router.options('/marks', async (ctx) => {
        ctx.body = 'ok';
    });

    router.get('/marks', async (ctx) => {
        const ssd = ctx.app.semiStaticData;
        const marks = await ssd.get('marks');
        ctx.body = Data.specificate(marks).polisher('mongoose');
    });
};