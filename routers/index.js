/**
 * 主页子路由
 */

const router = require('koa-router')();
const index = require('../controllers/index');


router.get('/', index.indexPage);
router.get('sign', index.signPage);
router.get('login', index.loginPage);


module.exports = router;
