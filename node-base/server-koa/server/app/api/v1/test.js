const koaRouter = require('koa-router')

const router = new koaRouter({
    prefix: '/api'
})

router.get('/testBeacon', async (ctx, next) => {
    if (ctx.method == 'OPTIONS') {
        ctx.body = 200; 
    } else {
        await next();
    }
})

module.exports = router