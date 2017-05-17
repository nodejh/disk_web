const url = require('url');
const uuid = require('uuid/v1');
const xss = require('xss');
const request = require('./../utils/request');
const Articles = require('./../models/Articles');
const Users = require('./../models/Users');


const urlContent = async (ctx) => {
  const urlString = ctx.request.body.url;
  const urlParsed = url.parse(urlString);
  console.log('urlParsed: ', urlParsed);
  const options = {
    host: urlParsed.host,
    hostname: urlParsed.hostname,
    port: urlParsed.port,
    method: 'GET',
    path: urlParsed.path,
  };
  try {
    const res = await request('', options);
    const body = res.body.replace(/\s+/g, '');
    console.log('body: ', body);
    const title = body.substring(body.indexOf('<title>') + 7, body.indexOf('</title>'));
    ctx.body = {
      code: 0,
      data: {
        title,
        content: '',
      },
    };
  } catch (e) {
    console.error('e: ', e);
  }
};


const insert = async (ctx) => {
  const result = { code: 1000, message: '', isLogin: false };
  if (!ctx.session.uid) {
    result.message = '请登录后再操作';
    ctx.body = result;
    return false;
  }
  result.isLogin = true;
  const { uid } = ctx.session;
  try {
    const { title, content, url: siteUrl, category } = ctx.request.body;
    const users = await Users.find({ id: uid });
    if (users.length !== 1) {
      result.message = '用户账户异常，请联系管理员';
    } else {
      const data = {
        id: uuid(),
        title: xss(title),
        content: xss(content),
        url: xss(siteUrl),
        category: xss(category),
        date: new Date(), //  该网站发布日期
        publishDate: new Date(), // 百度云发布日期
        user: {
          uid: users[0].id,
          name: users[0].name,
          avatar: users[0].avatar,
        }, // 发布用户的信息
        history: [],
      };
      const article = new Articles(data);
      await article.save(data);
      result.message = '分享成功';
      result.code = 0;
    }
  } catch (exception) {
    result.message = exception.message || '分享失败，请重试';
  } finally {
    ctx.body = result;
  }
  return true;
};


module.exports = {
  urlContent,
  insert,
};
