import signUpAction from 'pods/users/actions/sign-up-action';

export default function (router) {
    router.post('/sign-up', async (ctx, next) => {
        await signUpAction(ctx.request.body)
            .then((response) => {
                const {errors, user} = response;
                if (errors) {
                    ctx.body = errors;
                    ctx.status = 422;
                } else {
                    ctx.body = user;
                    ctx.status = 201;
                }
            })
            .catch((error) => {
                ctx.throw(err, 500);
            });
    });

    return router;
};