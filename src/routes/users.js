import signUpAction from 'pods/users/actions/sign-up-action';
import signInAction from 'pods/users/actions/sign-in-action';
import Data from 'components/data';

export default function (router) {
    router.options('/sign-up', async (ctx) => {
        ctx.body = 'ok';
    });

    router.options('/sign-in', async (ctx) => {
        ctx.body = 'ok';
    });

    router.options('/users', async (ctx) => {
        ctx.body = 'ok';
    });

    router.options('/users/current', async (ctx) => {
        ctx.body = 'ok';
    });

    router.post('/sign-up', async (ctx, next) => {
        await signUpAction(ctx.request.body)
            .then((response) => {
                const {errors, user} = response;
                if (errors) {
                    ctx.body = Data.Errors.specificate(errors);
                    ctx.status = 422;
                } else {
                    ctx.body = Data.specificate(user);
                    ctx.status = 201;
                }
            })
            .catch((error) => {
                ctx.throw(error, 500);
            });
    });

    router.post('/sign-in', async (ctx, next) => {
        await signInAction(ctx.request.body)
            .then((response) => {
                const {errors, user} = response;
                if (errors) {
                    ctx.body = errors;
                    ctx.status = 422;
                } else {
                    ctx.body = user;
                    ctx.status = 200;
                }
            })
            .catch((error) => {
                ctx.throw(error, 500);
            });
    });

    router.get('/users', async (ctx, next) => {

    });

    router.get('/users/current', async (ctx, next) => {
        if (ctx.req.appUser) {
            ctx.body = Data.specificate(ctx.req.appUser).polisher('user');
        } else {
            ctx.throw(401);
        }
    });
};