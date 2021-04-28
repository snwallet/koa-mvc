const Koa = require('koa');

const cors = require('koa2-cors');

const BodyParser = require('koa-bodyparser');

const views = require('koa-views');

const path = require('path');

const staticFiles = require('koa-static');

const WebSocket = require('ws');

const http = require('http');

const app = new Koa();

const WebSocketApi = require('./lib/ws/ws');//import ws


const post_config = require('./post_config');
const get_config = require('./get_config');


//async start function
async function start(port) {
    try {
        app.use(async (ctx, next) => {
            await next();
            console.log(`Process ${new Date().toString()}  ${ctx.request.method} ${ctx.request.url}...`);
            if(ctx.request.method=="POST")
            {

                for (let key in post_config)
                {
                    if (ctx.request.path == key){
                        let obj = ctx.request.body;
                        ctx.body = await post_config[key](obj)
                    }
                }
            }
            if(ctx.request.method=="GET")
            {
                for (let key in get_config)
                {
                    if (ctx.request.path == key){
                        let obj = ctx.request.query;
                        ctx.body = await get_config[key](obj)
                    }
                }
            }
            if(parseInt(ctx.status) === 404 ){
                //ctx.response.redirect("/404")
                ctx.body = "404"
            }
        });
        //cors
        app.use(cors());
        //body parser
        app.use(BodyParser());
        //static dir
        app.use(staticFiles(path.join(__dirname + '/public/')));

        app.use(views('views', { map: {html: 'ejs' }}));
        app.use(views(path.join(__dirname, './view'), {
            extension: 'ejs'
        }))

        //call back server
        let server = http.createServer(app.callback())
        //ws server
        let wss = new WebSocket.Server({server});
        //webSoket run
        WebSocketApi(wss)
        //listen port
        server.listen(port)
        // log run port
        console.log('server run at http://127.0.0.1:'+port)
    } catch (e) {
        //catch  error
        console.log(e)
    }
}

module.exports = start;