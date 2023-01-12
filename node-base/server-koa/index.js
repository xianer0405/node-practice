const Koa = require('koa')

const app = new Koa();

app.use(async (ctx, next) => {
    console.log('before plugin 1');
    await next();
    const rt = ctx.response.get('X-Response-Time');
    console.log('after plugin 1');
    console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

app.use(async (ctx, next) => {
    console.log('before plugin 2');
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
    console.log('after plugin 2');
});

app.use()

app.on('error', (err, ctx) => {
    console.error('server error,', err, ctx);
})

app.use(async ctx => {
    ctx.body = 'Hello World';
})

const PORT = 3000;
app.listen(PORT);
console.log(`server running at localhost:${PORT}`)