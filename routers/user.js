const router = require('koa-router')();
const user = require('./../controllers/user');


router.get('/write', user.writePage);


module.exports = {
  router,
};
