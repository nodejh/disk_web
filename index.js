const path = require('path');
const Koa = require('koa');
const views = require('koa-views');
const koaStatic = require('koa-static');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const wechat = require('co-wechat');

const config = require('./config/config');
const routers = require('./routers/routers');


const app = new Koa();


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


app.use(wechat({
  token: 'token',
  appid: 'appid',
  encodingAESKey: 'encodinAESKey',
  checkSignature: true, // 可选，默认为true。由于微信公众平台接口调试工具在明文模式下不发送签名，所以如要使用该测试工具，请将其设置为false
}).middleware(async (message) => {
  // 微信输入信息就是这个 message
  if (message.FromUserName === 'diaosi') {
    // 回复屌丝(普通回复)
    return 'hehe';
  } else if (message.FromUserName === 'text') {
    // 你也可以这样回复text类型的信息
    return {
      content: 'text object',
      type: 'text',
    };
  } else if (message.FromUserName === 'hehe') {
    // 回复一段音乐
    return {
      type: 'music',
      content: {
        title: '来段音乐吧',
        description: '一无所有',
        musicUrl: 'http://mp3.com/xx.mp3',
        hqMusicUrl: 'http://mp3.com/xx.mp3',
      },
    };
  } else if (message.FromUserName === 'kf') {
    // 转发到客服接口
    return {
      type: 'customerService',
      kfAccount: 'test1@test',
    };
  } else {
    // 回复高富帅(图文回复)
    return [
      {
        title: '你来我家接我吧',
        description: '这是女神与高富帅之间的对话',
        picurl: 'http://nodeapi.cloudfoundry.com/qrcode.jpg',
        url: 'http://nodeapi.cloudfoundry.com/',
      },
    ];
  }
}));

// 初始化路由中间件
app.use(routers.routes()).use(routers.allowedMethods());


// 监听启动端口
app.listen(config.port);
console.log(`the server is start at port ${config.port}`);
