export default async (ctx, next) => {
    const res = ctx.res;
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, HEAD, PATCH, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type, Accept");
    await next();
};
