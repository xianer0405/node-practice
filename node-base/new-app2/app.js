/**
 * koa-static 静态资源中间件 静态web服务
 * 1、npm install --save koa-static
 * 2、const static = require('koa-static');
 * 3、配置中间件
 * app.use(static('static'))
 */
// 引入模块
const Koa = require('koa');
const router = require('koa-router')(); /*引入是实例化路由 推荐*/
const views = require('koa-views');
const bodyParser = require('koa-bodyparser');
const static = require('koa-static');

// 实例化
let app = new Koa();

// 应用ejs模板引擎
// app.use(views('views', { map: { html: 'ejs' } }));
app.use(views('views', { extension: 'html' }));

// http://localhost:3000/css/basic.css 首先去static目录找,如果能找到返回对应的文件,找不到next()

// 配置静态web服务的中间件
// app.use(static('static'));
app.use(static(__dirname + '/static'));

app.use(static(__dirname + '/public')); // koa静态资源中间件可以配置多个

// 配置post bodyparser的中间件
app.use(bodyParser());

router.get('/', async (ctx) => {
  await ctx.render('index');
})

// 接收post提交的数据
router.post('/doAdd', async (ctx) => {
  console.log(ctx.request.body);
  ctx.body = ctx.request.body; // 获取表单提交的数据
})

router.get('/doAdd', async (ctx) => {
  console.log(ctx.request.params);
  ctx.body = ctx.request.params; // 获取表单提交的数据
})

router.post('/post', async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  if (ctx.method === 'OPTIONS') {
    ctx.body = 200; 
  } else {
    await next();
  }
})

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3001);