import responseTimeMiddleware from 'middlewares/response-time-middleware';
import corsMiddleware from 'middlewares/cors-middleware';
import authMiddleware from 'middlewares/auth-middleware';

export default function (app, handleRequest) {
    app.use(responseTimeMiddleware);
    app.use(corsMiddleware);
    app.use(authMiddleware);
    handleRequest();
};