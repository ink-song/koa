const Koa =  require('koa')
const Router = require('koa-router')
const router = new Router()
const Swig = require('koa-swig')
const StaticCache = require('koa-static-cache')
const co = require('co')
const BodyParser = require('koa-bodyparser')
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

/**
 * 4.解析表单中body的数据
 */
app.use(new BodyParser())

// add task
router.get('/add', async (ctx) => {
  ctx.body = await ctx.render('add.html', {data})
})

// 提交表单
/**
 * url过长时，不推荐使用queryString的方式,
 * post提交不会在历史记录中看到登陆信息
 */
router.get('/posttask', async (ctx) => {
  ctx.body = '2222'
})

router.post('/posttask', async (ctx) => {
  if (!ctx.request.body.title) {
    ctx.body = await ctx.render('message', {
      message: '请先输入标题',
      href: 'javascript:history.back()'
    })
    return 
  }
  data.tasks.push({
    id: ++data.maxId,
    title: ctx.request.body.title,
    done: false
  })
  ctx.body = await ctx.render('message', {
    message: '添加成功',
    href: '/'
  })
})
app.use(router.routes())
app.listen(80)