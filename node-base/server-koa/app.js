const Koa = require('koa')
const { koaBody } = require('koa-body')
const koaStatic = require('koa-static')
const koaViews = require('koa-views')
const cors = require('koa2-cors');
const path = require('path')
const fs = require('fs')
const errorHandler = require('./server/middleware/exception')

const AppLoader = require('./server/core/init')

const resolve = path.resolve;

const app = new Koa()

app.use(cors({
    origin: '*',
    maxAge: 500, //指定本次预检请求的有效期，单位为秒。
    credentials: true, //是否允许发送Cookie
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //设置所允许的HTTP请求方法
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'], //设置服务器支持的所有头信息字段
    exposeHeaders: [''] //设置获取其他自定义字段
}));

// app.use(async (ctx) => {
//     console.log('ctx.path===', ctx.path);
//     if (ctx.path === '' || ctx.path === '/') {
//         ctx.set("Content-Type", "text/html");
//         ctx.body = fs.readFileSync("./server/public/index.html");
//     }
// })

app.use(errorHandler)
app.use(koaBody())

AppLoader.bootstrap(app);

app.use(koaStatic(__dirname, './server/public'))
app.use(koaViews(resolve(__dirname, './server/views'), {
    extension: 'ejs'
}))

app.listen(3000, () => {
    console.log('Koa is listening in http://localhost:3000')
})

module.exports = app