/**
 * 主页子路由
 */

const router = require('koa-router')();
const index = require('../controllers/index');


router.get('/', index.indexPage);


module.exports = router;
