/**
 * RESTFUL API 子路由
 */

const router = require('koa-router')();
const apiLogin = require('../controllers/apiLogin');


router.get('/isLogin', apiLogin.isLogin);
router.post('/sign', apiLogin.sign);
router.post('/login', apiLogin.login);
router.get('/logout', apiLogin.logout);


module.exports = router;
