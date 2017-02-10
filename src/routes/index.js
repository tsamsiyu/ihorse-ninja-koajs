import usersRoutes from 'routes/users';
import marksRoutes from 'routes/marks';
import systemRoutes from 'routes/system';
import Router from 'components/router';

export default function (app) {
    const router = new Router;

    router.namespace('/v1', (v1) => {
        usersRoutes(v1);
        marksRoutes(v1);
        systemRoutes(v1);

        app.use(v1.routes());
    });
};