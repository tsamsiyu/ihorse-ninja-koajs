import Koa from 'koa';
import middlewares from 'middlewares';
import initializers from 'initializers';
import routes from 'routes';

export default function (config) {
    const app = new Koa();

    app.config = config;
    initializers(app, () => {
        app.listen(app.config.server.port);
        app.logger.info(`App started at port ${app.config.server.port}`);
        middlewares(app, () => {
            routes(app);
        });
    });
};