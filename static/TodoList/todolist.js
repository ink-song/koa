const koa = require('koa')
const Router = require('koa-router')
const router = new Router()
const app = new koa()

console.log(router)

/**
 * 1.后端路由设计
 */

 /**
  * 首页路由
  */

router.get('/', ctx => {
  ctx.body = '/'
})

 /**
  * 添加路由
  */

 router.get('/add', ctx => {
  ctx.body = '/add'
})

 /**
  * 删除路由
  */

 router.get('/delete', ctx => {
  ctx.body = '/delete'
})

 /**
  * 编辑路由
  */

 router.get('/edit', ctx => {
  ctx.body = '/edit'
})

 /**
  * 编辑路由
  */

 router.get('/edit', ctx => {
  ctx.body = '/edit'
})
app.listen(80)

app.use(router.routes())