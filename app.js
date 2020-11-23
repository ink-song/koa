const StaticCache = require('koa-static-cache')
const BodyParser = require('koa-bodyparser')
const Router = require('koa-router')
const Koa = require('koa')
const Swig =  require('koa-swig')
const app = new Koa()
console.log(Swig)
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
app.context.render = co.wrap(render)
router.get('/', async ctx => {
    // ctx.body = {
    //     data: {
    //         a: 1
    //     },
    //     message: 'success',
    //     error_code: 200
    // }
    ctx.body = await ctx.render('list.html')
})
app.use(router.routes())
app.listen(80)