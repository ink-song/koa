const Koa =  require('koa')
const Router = require('koa-router')
const router = new Router()
const Swig = require('koa-swig')
const StaticCache = require('koa-static-cache')
const co = require('co')
const app = new Koa()

/**
 * 实现换肤功能
 *
 */
const data = {
  skin: 'index',
  appName: '你是谁',
  tasks: [
    {
      title: 'nihao',
      done: true
    },
    {
      title: 'nihao1',
      done: false
    }
  ]
}

/**
 * 1. 设置模板引擎
 */
app.context.render = co.wrap(new Swig({
  root: `${__dirname}/views`,
  cache: false,
  ext: 'html'
}))

/**
 * 2.加载静态资源
 */

app.use(new StaticCache('./static', {
  prefix: '/static',
  gzip: true
}))


/**
 * 3.设计路由
 */
router.get('/', async (ctx) => {
  ctx.body = await ctx.render('index.html', {data})
})

// add task
router.get('/add', async (ctx) => {
  ctx.body = await ctx.render('add.html', {data})
})

app.use(router.routes())
app.listen(80)