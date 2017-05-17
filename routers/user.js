const router = require('koa-router')();
const user = require('./../controllers/user');


router.get('/write', user.writePage);
router.get('/list/:uid', user.list);

module.exports = router;
