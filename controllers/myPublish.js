const Articles = require('./../models/Articles');
const Users = require('./../models/Users');
const pageSize = require('./../utils/constants').pageSize;

const indexPage = async (ctx) => {
  const { uid } = ctx.session;
  if (!uid) {
    ctx.redirect('/');
    return false;
  }
  const title = '拇指搜';
  let res = [];
  const pagination = {};
  let user = {};
  try {
    const users = await Users.find({ id: uid });
    user = users[0];
    // console.log('user: ', user);
    // 查询总数
    pagination.count = await Articles.find({ 'user.uid': uid }).count();
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
    res = await Articles.find({ 'user.uid': uid }).skip(start).limit(pageSize).sort({ date: -1 });
  } catch (exception) {
    console.error('exception: ', exception);
  } finally {
    await ctx.render('my_publish', {
      title,
      list: res,
      user,
      isTagsPage: false,
      isLogin: Boolean(ctx.session.uid),
      count: pagination.count,
      page: pagination.page,
      allPageNumber: pagination.allPageNumber,
      tag: null,
    });
  }
  return true;
};


const tagsPage = async (ctx) => {
  const { uid } = ctx.session;
  // console.log('uid: ', uid);
  if (!uid) {
    ctx.redirect('/');
    return false;
  }
  const title = '拇指搜';
  let res = [];
  const pagination = {};
  const { tag } = ctx.params;
  // console.log('tag: ', tag);
  let user = {};
  if (!tag) {
    ctx.redirect('/mypublish');
    return false;
  }
  try {
    const users = await Users.find({ id: uid });
    user = users[0];
    // console.log('user: ', user);
    // 查询总数
    pagination.count = await Articles.find({ 'user.uid': uid, category: { $regex: tag } }).count();
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
    res = await Articles.find({ 'user.uid': uid, category: { $regex: tag } })
      .skip(start).limit(pageSize).sort({ date: -1 });
    // console.log('res: ', res);
  } catch (exception) {
    console.error('exception: ', exception);
  } finally {
    await ctx.render('my_publish', {
      title,
      user,
      list: res,
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


module.exports = {
  indexPage,
  tagsPage,
};
