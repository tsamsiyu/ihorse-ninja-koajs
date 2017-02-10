import mongooseDataPolisher from 'components/data-polisher/mongoose';

export default function (router) {
    router.options('/marks', async (ctx) => {
        ctx.body = 'ok';
    });

    router.get('/marks', async (ctx, next) => {
        // await marksCache.all(ctx.app).then((marks) => {
        //     ctx.body = mongooseDataPolisher.polish(marks);
        //     ctx.status = 200;
        // });
    });
};