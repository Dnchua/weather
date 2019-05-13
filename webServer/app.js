var koa = require('koa');
var app = new koa();
var router = require('koa-router')();
const cors = require('koa2-cors');
const session = require('koa-session-minimal');
const MysqlStore = require('koa-mysql-session');
var bodyparser = require('koa-bodyparser');
var config = require('./lib/config.js');
// var proxy = require('koa-server-http-proxy');


const sessionMysqlConfig = {
    user: config.database.USERNAME,
    password: config.database.PASSWORD,
    database: config.database.DATABASE,
    host: config.database.HOST,
};


app.use(session({
    key: 'USER_SID',
    store: new MysqlStore(sessionMysqlConfig)
}));



app.use(cors({
    origin: function (ctx) {
            return "*"; // 允许来自所有域名请求
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));

app.use(bodyparser());

router.post('/', async function (ctx) {
    ctx.body = '恭喜 臭傻逼 你成功登陆了'
});


app.use(require('./routers/sign.js').routes());
app.use(require('./routers/getBook.js').routes());
// app.use(require('./routers/getUserInfo.js').routes());
// app.use(require('./routers/updateScore.js').routes());
// app.use(require('./routers/insertScore.js').routes());
app
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(config.port);
console.log('Koa server is started! listen at ' + config.port);
