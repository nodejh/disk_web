const Articles = require('./../models/Articles');
const pageSize = require('./../utils/constants').pageSize;

const indexPage = async (ctx) => {
  const title = '拇指搜-发现无限资源';
  let res = [];
  const pagination = {};
  try {
    // 查询总数
    pagination.count = await Articles.find({}).count();
    // 当前页码
    pagination.page = ctx.request.query.page === undefined ?
      1 : parseInt(ctx.request.query.page, 10);
    // 每页数量
    const size = ctx.request.query.size === undefined ?
      pageSize : parseInt(ctx.request.query.size, 10);
    pagination.allPageNumber = Math.floor((pagination.count / size) + 1);
    // 起始位置
    const start = (pagination.page - 1) * size;
    // console.log('count: ', pagination.count);
    res = await Articles.find({}).skip(start).limit(pageSize).sort({ date: -1 });
  } catch (exception) {
    console.error('exception: ', exception);
  } finally {
    await ctx.render('index', {
      title,
      list: res,
      isSearchPage: false,
      isTagsPage: false,
      isLogin: Boolean(ctx.session.uid),
      count: pagination.count,
      page: pagination.page,
      allPageNumber: pagination.allPageNumber,
      tag: null,
    });
  }
};


const tagsPage = async (ctx) => {
  let res = [];
  const pagination = {};
  const { tag } = ctx.params;
  if (!tag) {
    ctx.redirect('/');
    return false;
  }
  try {
    // 查询总数
    pagination.count = await Articles.find({ category: { $regex: tag } }).count();
    // 当前页码
    pagination.page = ctx.request.query.page === undefined ?
      1 : parseInt(ctx.request.query.page, 10);
    // 每页数量
    const size = ctx.request.query.size === undefined ?
      pageSize : parseInt(ctx.request.query.size, 10);
    pagination.allPageNumber = Math.floor((pagination.count / size) + 1);
    // 起始位置
    const start = (pagination.page - 1) * size;
    // console.log('count: ', pagination.count);
    res = await Articles.find({ category: { $regex: tag } })
      .skip(start).limit(pageSize).sort({ date: -1 });
  } catch (exception) {
    console.error('exception: ', exception);
  } finally {
    await ctx.render('index', {
      title: `${tag}-拇指搜`,
      list: res,
      isSearchPage: false,
      isTagsPage: true,
      isLogin: Boolean(ctx.session.uid),
      count: pagination.count,
      page: pagination.page,
      allPageNumber: pagination.allPageNumber,
      tag,
    });
  }
  return true;
};


const subjectPage = async (ctx) => {
  let res = [];
  const pagination = {};
  const { subject } = ctx.params;
  if (!subject) {
    ctx.redirect('/');
    return false;
  }
  try {
    // 查询总数
    pagination.count = await Articles.find({ category: { $regex: subject } }).count();
    // 当前页码
    pagination.page = ctx.request.query.page === undefined ?
      1 : parseInt(ctx.request.query.page, 10);
    // 每页数量
    const size = ctx.request.query.size === undefined ?
      pageSize : parseInt(ctx.request.query.size, 10);
    pagination.allPageNumber = Math.floor((pagination.count / size) + 1);
    // 起始位置
    const start = (pagination.page - 1) * size;
    console.log('count: ', pagination.count);
    res = await Articles.find({ category: { $regex: subject } })
      .skip(start).limit(pageSize).sort({ date: -1 });
  } catch (exception) {
    console.log('exception: ', exception);
  } finally {
    await ctx.render('subject', {
      title: `${subject}-拇指搜`,
      list: res,
      isLogin: Boolean(ctx.session.uid),
      count: pagination.count,
      page: pagination.page,
      allPageNumber: pagination.allPageNumber,
      subject,
    });
  }
  return true;
};

const signPage = async (ctx) => {
  await ctx.render('sign', {
    title: '登录',
    isLogin: Boolean(ctx.session.uid),
  });
};

const signPageSubject = async (ctx) => {
  await ctx.render('sign_subject', {
    title: '登录',
    isLogin: Boolean(ctx.session.uid),
  });
};


const loginPage = async (ctx) => {
  await ctx.render('login', {
    title: '登录',
    isLogin: Boolean(ctx.session.uid),
  });
};


const protocolSign = async (ctx) => {
  await ctx.render('protocol_sign', {
    title: '拇指搜注册协议-欢迎您加入拇指搜',
    isLogin: Boolean(ctx.session.uid),
  });
};


const redirectPage = async (ctx) => {
  const { url } = ctx.request.query;
  // console.log('url: ', url);
  if (url) {
    await ctx.redirect(url);
  } else {
    await ctx.redirect('/');
  }
};

module.exports = {
  indexPage,
  tagsPage,
  subjectPage,
  signPage,
  signPageSubject,
  loginPage,
  protocolSign,
  redirectPage,
};
