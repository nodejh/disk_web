const path = require('path');
const Koa = require('koa');
const views = require('koa-views');
const koaStatic = require('koa-static');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const session = require('koa-generic-session');
const MongoStore = require('koa-generic-session-mongo');
const mongoose = require('mongoose');


const config = require('./config/config');
const routers = require('./routers/routers');

mongoose.Promise = global.Promise;
mongoose.connect(config.mongodb);
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', () => {
  console.log('连接数据库成功');
});


const app = new Koa();

// session
app.keys = ['muzhiso', 'muzhisosos'];
app.use(session({
  store: new MongoStore(),
}));

// 配置控制台日志中间件
app.use(logger());

// 配置ctx.body解析中间件
app.use(bodyParser());

// 配置静态资源加载中间件
app.use(koaStatic(path.join(__dirname, './static')));


// 配置服务端模板渲染引擎中间件
app.use(views(path.join(__dirname, './views'), {
  extension: 'ejs',
}));


// 初始化路由中间件
app.use(routers.routes()).use(routers.allowedMethods());


// 监听启动端口
app.listen(config.port);
console.log(`the server is start at port ${config.port}`);
