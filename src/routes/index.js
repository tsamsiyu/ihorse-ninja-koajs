import usersRouter from 'routes/users';
import Router from 'components/router';

export default function (app) {
    const router = new Router;

    router.namespace('/v1', (v1) => {
        app.use(usersRouter(v1).routes());
    });
};