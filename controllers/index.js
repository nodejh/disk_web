const Resources = require('./../models/Resources');


const indexPage = async (ctx) => {
  const title = '拇指搜';
  let res = [];
  try {
    console.log('dddd');
    res = await Resources.find({}).limit(10).sort({ _id: -1 });
    console.log('res: ', res);
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
      allPageNumber: 100,
      count: 100,
      page: 1,
    });
  }
};


module.exports = {
  indexPage,
};
