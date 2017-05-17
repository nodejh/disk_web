const Articles = require('./../models/Articles');


const detailPage = async (ctx) => {
  const { id: aid } = ctx.params;
  try {
    const articles = await Articles.find({ id: aid });
    console.log('articles: ', articles);
    if (articles.length === 0) {
      await ctx.render('error', {
        message: '[ERROR] 没有相关资源',
      });
      return false;
    }
    const article = articles[0];
    await ctx.render('article_detail', {
      title: article.title,
      article,
      isLogin: Boolean(ctx.session.uid),
    });
  } catch (exception) {
    console.error('exception: ', exception);
    await ctx.render('error', {
      message: exception.message || '服务器错误，请重试',
    });
  }
  return true;
};


module.exports = {
  detailPage,
};
