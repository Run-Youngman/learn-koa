const Koa = require('koa');

const bodyParser = require('koa-bodyparser');

const controller = require('./controller');
const mongoose = require('mongoose');
const templating = require('./templating');
var cors = require('koa2-cors');

const app = new Koa();
const socket = require('./socket')
const http = require('http').Server(app.callback())
const io = require('socket.io')(http)
const handler = async (ctx, next) => {
    try {
      await next()
    } catch (error) {
      ctx.response.body = {
        error: true,
        code: '00000',
        message: '服务器异常',
        desc: error.message
      }
    }
  }

const isProduction = process.env.NODE_ENV === 'production';

try{
    mongoose.connect('mongodb://localhost/test')
}catch(error){
    console.log(err)
}

mongoose.connection
    .once("open",function(){
        console.log('mongoose connection')
        const models = require('./models')(mongoose)
        app.use(handler)
        app.use(bodyParser());
        app.use(cors())
        app.use(async (ctx,next) => {
            ctx.models = models;
            await next();
        })
        // static file support:
        if (! isProduction) {
            let staticFiles = require('./static-files');
            app.use(staticFiles('/static/', __dirname + '/static'));
        }

        // add nunjucks as view:
        app.use(templating('views', {   //返回了一个异步函数，函数内容是给ctx.render赋值或定义，之后ctx就可以使用render函数了。
            noCache: !isProduction,
            watch: !isProduction
        }));
        app.use(controller());
        
    })
    .on('error',function(error, ctx){
        console.log('some thing wrong', error)
        ctx.body = error.message;
    })
    socket(io)
http.listen(8080, function() {
    console.log('app started at port 8080...');
});
