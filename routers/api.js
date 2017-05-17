/**
 * RESTFUL API 子路由
 */

const router = require('koa-router')();
const apiLogin = require('../controllers/apiLogin');
const apiUserWrite = require('../controllers/apiUserWrite');
const apiUpload = require('../controllers/apiUpload');


router.get('/isLogin', apiLogin.isLogin);
router.post('/sign', apiLogin.sign);
router.post('/login', apiLogin.login);
router.post('/upload', apiUpload.upload);
router.get('/logout', apiLogin.logout);
router.get('/urlContent', apiUserWrite.urlContent);

module.exports = router;
