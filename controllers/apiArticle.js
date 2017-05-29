const xss = require('xss');
const Articles = require('./../models/Articles');
const Users = require('./../models/Users');

const edit = async (ctx) => {
  const { uid } = ctx.session;
  if (!uid) {
    ctx.body = { code: 1000, message: '请登录后再操作' };
    return false;
  }
  try {
    const { title, content, url: siteUrl, tags: category, id: aid } = ctx.request.body;
    const users = await Users.find({ id: uid });
    if (users.length !== 1) {
      ctx.body = { code: 2000, message: '用户账户异常，请联系管理员' };
      return false;
    }
    const articles = await Articles.find({ id: aid });
    if (articles.length !== 1) {
      ctx.body = { code: 3000, message: '分享内容异常，请联系管理员' };
      return false;
    }
    const user = users[0];
    const article = articles[0];
    const history = Array.isArray(article.history) ? article.history : [];
    console.log('history: ', history);
    history.push({
      user: {
        uid: article.user.uid,
        name: article.user.name,
        avatar: article.user.avatar,
      },
      article: {
        title: article.title,
        content: article.content,
        url: article.url,
        category: article.category,
        size: article.size,
        date: article.date,
        publishDate: articles.publishDate,
      },
      date: new Date(), // 存为历史记录的日期
    });
    const newData = {
      title: xss(title),
      content: xss(content),
      url: xss(siteUrl),
      category: xss(category),
      date: new Date(),
      user: {
        uid: user.id,
        name: user.name,
        avatar: user.avatar,
      },
      history,
    };
    // console.log('newData: ', newData);
    await Articles.update({ id: aid }, newData);
    // console.log('res: ', res);
    ctx.body = { code: 0, message: '更新成功' };
    return true;
  } catch (exception) {
    console.log('exception: ', exception);
    ctx.body = { code: 4000, message: exception.message || '更新失败，请重试' };
    return false;
  }
};


module.exports = {
  edit,
};
