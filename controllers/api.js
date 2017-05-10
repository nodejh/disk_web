const testPage = async (ctx) => {
  const title = 'Test Page';
  await ctx.render('test', {
    title,
  });
};


const testPost = async (ctx) => {
  ctx.body = {
    success: true,
    data: {},
  };
};


module.exports = {
  testPage,
  testPost,
};
