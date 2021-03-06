const Articles = require('./../models/Articles');
const Users = require('./../models/Users');
const pageSize = require('./../utils/constants').pageSize;

const writePage = async (ctx) => {
  const { uid } = ctx.session;
  if (!uid) {
    ctx.redirect('/');
    return false;
  }
  const title = '拇指搜';
  const userWrite = ctx.session.type ? 'user_write_subject' : 'user_write';
  await ctx.render(userWrite, {
    title,
    isLogin: Boolean(ctx.session.uid),
  });
  return true;
};


const writeSubjectPage = async (ctx) => {
  const { uid } = ctx.session;
  if (!uid) {
    ctx.redirect('/');
    return false;
  }
  const title = '拇指搜';
  await ctx.render('user_write_subject', {
    title,
    isLogin: Boolean(ctx.session.uid),
  });
  return true;
};


const list = async (ctx) => {
  const { uid, category = '' } = ctx.request.query;
  console.log('uid: ', uid);
  console.log('category: ', category);
  if (!uid) {
    ctx.redirect('/');
  }
  const title = '拇指搜';
  let res = [];
  let user = {};
  const pagination = {};
  try {
    const users = await Users.find({ id: uid });
    user = users[0];
    // console.log('user: ', user);
    // 查询总数
    if (category) {
      pagination.count = await Articles.find({ 'user.uid': uid, category: { $regex: category } }).count();
    } else {
      pagination.count = await Articles.find({ 'user.uid': uid }).count();
    }
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
    if (category) {
      res = await Articles.find({ 'user.uid': uid, category: { $regex: category } }).skip(start).limit(pageSize).sort({ date: -1 });
    } else {
      res = await Articles.find({ 'user.uid': uid }).skip(start).limit(pageSize).sort({ date: -1 });
    }
  } catch (exception) {
    console.error('exception: ', exception);
  } finally {
    await ctx.render('user_list', {
      title: `${user.name}-${title}`,
      list: res,
      user,
      uid,
      isTagsPage: false,
      isLogin: Boolean(ctx.session.uid),
      count: pagination.count,
      page: pagination.page,
      allPageNumber: pagination.allPageNumber,
      category,
    });
  }
  return true;
};

module.exports = {
  writePage,
  writeSubjectPage,
  list,
};
