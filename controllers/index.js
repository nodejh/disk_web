const Resources = require('./../models/Articles');


const indexPage = async (ctx) => {
  const title = '拇指搜';
  let res = [];
  const pagination = {};
  try {
    // 查询总数
    pagination.count = await Resources.find({}).count();
    // 当前页码
    pagination.page = ctx.request.query.page === undefined ?
      1 : parseInt(ctx.request.query.page, 10);
    // 每页数量
    const size = ctx.request.query.size === undefined ? 10 : parseInt(ctx.request.query.size, 10);
    pagination.allPageNumber = Math.floor((pagination.count / size) + 1);
    // 起始位置
    const start = (pagination.page - 1) * size;
    console.log('count: ', pagination.count);
    res = await Resources.find({}).skip(start).limit(10).sort({ _id: -1 });
  } catch (exception) {
    console.log('exception: ', exception);
  } finally {
    await ctx.render('index', {
      title,
      tags: ['dd'],
      list: res,
      isSearchPage: false,
      isTagsPage: false,
      isLogin: Boolean(ctx.session.uid),
      pagination,
    });
  }
};


const signPage = async (ctx) => {
  console.log('ddd');
  await ctx.render('sign', {
    title: '登录',
    isLogin: Boolean(ctx.session.uid),
  });
};


const loginPage = async (ctx) => {
  console.log('ddd');
  await ctx.render('login', {
    title: '登录',
    isLogin: Boolean(ctx.session.uid),
  });
};


module.exports = {
  indexPage,
  signPage,
  loginPage,
};
