import usersRouter from 'routes/users';

export default function (app) {
    app.use(usersRouter.routes());

    app.use(async (ctx, next) => {
        ctx.body = 'Hello world';
    });
};