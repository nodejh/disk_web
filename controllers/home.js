const indexPage = async (ctx) => {
  const title = 'Home Page';
  await ctx.render('index', {
    title,
  });
};


module.exports = {
  indexPage,
};
