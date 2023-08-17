const Koa = require('koa')
const { koaBody } = require('koa-body')
const koaStatic = require('koa-static')
const koaViews = require('koa-views')
const path = require('path')
const koaRouter = require('koa-router')
const resolve = path.resolve;

const router = new koaRouter();

const app = new Koa()
app.use(koaStatic(__dirname, './public'))
app.use(koaViews(resolve(__dirname, './views'), {
    extension: 'ejs'
}))

app.use(koaBody())

router.get('/', async (ctx) => {
  ctx.body = 'hello jackie.bevictory.run'
})

router.get('/hello', async (ctx) => {
  ctx.body = 'hello my first real node app'
})

app.use(router.routes())

const errorHandler = async (ctx, next) => {
  try {
      await next()
  } catch (error) {
      ctx.body = {
          msg: "系统错误！",
          error_code: 9999,
          request: `${ctx.method} ${ctx.path}`
      }
      ctx.response.status = 500
  }
}

app.use(errorHandler)

app.listen(3001, () => {
    console.log('Koa is listening in http://localhost:3001')
})
