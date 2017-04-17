import Data from 'components/data';

export default function (router) {
    router.options('/models', async (ctx) => {
        ctx.body = 'ok';
    });

    router.get('/models', async (ctx) => {
        return [];
    });
};