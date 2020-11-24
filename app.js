const StaticCache = require('koa-static-cache')
// const BodyParser = require('koa-bodyparser')
const Router = require('koa-router')
const Koa = require('koa')
const Swig =  require('koa-swig')
const co = require('co')
const app = new Koa()
app.use(StaticCache('./static', {
    prefix: '/static',
    gzip: true
})) 

const router = new Router()
const render =  new Swig({
    root: `${__dirname}/static`,
    cache: false,
    ext: '.html'
})
const users = [
    {name: '小明', age: 12},
    {name: '小绿', age: 12},
    {name: '小红', age: 12}
]
app.context.render = co.wrap(render)
router.get('/', async ctx => {
    ctx.body = await ctx.render('list.html', { users })
})
app.use(router.routes())
app.listen(80)