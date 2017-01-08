const Router = require('koa-router');

const router = new Router({
    prefix: '/users'
});

router.get('/', async (ctx, next) => {
    ctx.body = 'users';
});

export default router;
