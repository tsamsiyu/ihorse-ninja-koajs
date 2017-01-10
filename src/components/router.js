import KoaRouter from 'koa-router';

class Router extends KoaRouter {
    namespace(prefix, cb) {
        const newRouter = new Router({prefix});
        cb(newRouter);
    }
}

export default Router;