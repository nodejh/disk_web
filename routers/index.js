/**
 * 主页子路由
 */

const router = require('koa-router')();
const index = require('../controllers/home');


router.get('/', index.indexPage);


module.exports = router;
