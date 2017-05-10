/**
 * RESTFUL API 子路由
 */

const router = require('koa-router')();
const api = require('../controllers/api');


router.get('/test', api.testPage);
router.post('/test', api.testPost);


module.exports = router;
