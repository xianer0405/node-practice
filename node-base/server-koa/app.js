const Koa = require('koa')
const { koaBody } = require('koa-body')
const koaStatic = require('koa-static')
const koaViews = require('koa-views')
const path = require('path')
const errorHandler = require('./server/middleware/exception')

const AppLoader = require('./server/core/init')

const resolve = path.resolve;

const app = new Koa()
app.use(koaStatic(__dirname, './server/public'))
app.use(koaViews(resolve(__dirname, './server/views'), {
    extension: 'ejs'
}))

app.use(errorHandler)
app.use(koaBody())


AppLoader.bootstrap(app);

app.listen(3000, () => {
    console.log('Koa is listening in http://localhost:3000')
})

module.exports = app