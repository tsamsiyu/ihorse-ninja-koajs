import User from 'pods/users/user';

export default async function (ctx, next) {
    const TOKEN_REGEXP = /^Bearer\s(\w+)$/;

    let authHeader = ctx.req.headers.authorization;
    if (authHeader instanceof String) {
        const matches = authHeader.match(TOKEN_REGEXP);
        if (matches) {
            const token = matches[1];
            User.findOne({authToken: token})
                .populate('profile')
                .exec(async (err, user) => {
                    if (err) return next(err);
                    ctx.req.appUser = user;
                    await next();
                });
        } else {
            await next();
        }
    } else {
        await next();
    }
};
