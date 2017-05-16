const Resources = require('./../models/Articles');
const pageSize = require('./../utils/constants').pageSize;

const indexPage = async (ctx) => {
  const title = '拇指搜';
  let res = [];
  const pagination = {};
  const { q } = ctx.request.query;
  try {
    // 查询总数
    pagination.count = await Resources.find({
      $or: [
        { title: { $regex: q } },
        { content: { $regex: q } },
        { 'user.name': { $regex: q } },
      ],
    }).count();
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
    res = await Resources.find({
      $or: [
        { title: { $regex: q } },
        { content: { $regex: q } },
        { 'user.name': { $regex: q } },
      ],
    }).skip(start).limit(pageSize).sort({ _id: -1 });
  } catch (exception) {
    console.error('exception: ', exception);
  } finally {
    await ctx.render('search', {
      title,
      list: res,
      q,
      isLogin: Boolean(ctx.session.uid),
      count: pagination.count,
      page: pagination.page,
      allPageNumber: pagination.allPageNumber,
      tag: null,
    });
  }
};


module.exports = {
  indexPage,
};
