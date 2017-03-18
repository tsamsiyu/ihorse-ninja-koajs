import usersRoutes from 'routes/users';
import systemRoutes from 'routes/system';
import marksRoutes from 'routes/marks';
import countriesRoutes from 'routes/countries';
import Router from 'components/router';

export default function (app) {
    const router = new Router;

    router.namespace('/v1', (v1) => {
        usersRoutes(v1);
        systemRoutes(v1);
        marksRoutes(v1);
        countriesRoutes(v1);

        app.use(v1.routes());
    });
};