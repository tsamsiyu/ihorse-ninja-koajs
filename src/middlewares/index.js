import responseTimeMiddleware from 'middlewares/response-time-middleware';
import corsMiddleware from 'middlewares/cors-middleware';
import authMiddleware from 'middlewares/auth-middleware';
import responseSerializationMiddleware from 'middlewares/response-serialization-middleware';
import staticDataHeadersMiddleware from 'middlewares/static-data-headers-middleware';
import bodyParser from 'koa-bodyparser';

export default function (app, handleRequest) {
    app.use(responseTimeMiddleware);
    app.use(responseSerializationMiddleware);
    app.use(bodyParser());
    app.use(corsMiddleware);
    app.use(staticDataHeadersMiddleware);
    app.use(authMiddleware);
    handleRequest();
};