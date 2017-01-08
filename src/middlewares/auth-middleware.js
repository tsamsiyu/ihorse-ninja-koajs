import User from 'pods/users/user';

export default function (ctx, next) {
    const TOKEN_REGEXP = /^Bearer\s(\w+)$/;

    let authHeader = ctx.req.headers.authorization;
    if (authHeader instanceof String) {
        const matches = authHeader.match(TOKEN_REGEXP);
        if (matches) {
            const token = matches[1];
            User.findOne({authToken: token}).populate('profile').exec((err, user) => {
                if (err) return next(err);
                ctx.req.appUser = user;
                next();
            });
        } else {
            next();
        }
    } else {
        next();
    }
};
