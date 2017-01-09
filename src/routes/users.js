export default function (router) {
    router.get('/sign-up', async (ctx, next) => {
        ctx.body = {test: true};
    });

    return router;
};