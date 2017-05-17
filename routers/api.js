/**
 * RESTFUL API 子路由
 */

const router = require('koa-router')();
const apiLogin = require('../controllers/apiLogin');
const apiUserWrite = require('../controllers/apiUserWrite');
const apiUpload = require('../controllers/apiUpload');
const apiArticle = require('./../controllers/apiArticle');


router.get('/isLogin', apiLogin.isLogin);
router.post('/sign', apiLogin.sign);
router.post('/login', apiLogin.login);
router.post('/upload', apiUpload.upload);
router.get('/logout', apiLogin.logout);
router.post('/user/urlContent', apiUserWrite.urlContent);
router.post('/user/insert', apiUserWrite.insert);
router.post('/article/edit', apiArticle.edit);


module.exports = router;
