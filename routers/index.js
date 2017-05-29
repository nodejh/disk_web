/**
 * 主页子路由
 */

const router = require('koa-router')();
const index = require('../controllers/index');
const myPublish = require('./../controllers/myPublish');
const search = require('./../controllers/search');


router.get('/', index.indexPage);
router.get('tags/:tag', index.tagsPage);
router.get('subject/:subject', index.subjectPage);
router.get('sign', index.signPage);
router.get('sign2', index.signPageSubject);
router.get('login', index.loginPage);
router.get('myPublish', myPublish.indexPage);
router.get('myPublish/tags/:tag', myPublish.tagsPage);
router.get('search', search.indexPage);


module.exports = router;
