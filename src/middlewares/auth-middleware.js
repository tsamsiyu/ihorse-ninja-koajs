import User from 'pods/users/user';

export default async function (ctx, next) {
    const TOKEN_REGEXP = /^Bearer\s(.+)$/;

    let authHeader = ctx.req.headers.authorization;
    if (typeof authHeader === 'string') {
        const matches = authHeader.match(TOKEN_REGEXP);
        if (matches) {
            const token = matches[1];
            await User.findOne({authToken: token}).exec((err, user) => {
                if (err) return next(err);
                ctx.req.appUser = user;
            });
            await next();
        }
        return;
    }
    await next();
};
