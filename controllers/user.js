const writePage = async (ctx) => {
  const { uid } = ctx.session;
  if (!uid) {
    ctx.redirect('/');
    return false;
  }
  const title = '拇指搜';
  await ctx.render('user_write', {
    title,
    isLogin: Boolean(ctx.session.uid),
  });
  return true;
};


module.exports = {
  writePage,
};
