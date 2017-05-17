const router = require('koa-router')();

const index = require('./index');
const user = require('./user');
const article = require('./article');
const api = require('./api');


router.use('/', index.routes(), index.allowedMethods());
router.use('/user', user.routes(), user.allowedMethods());
router.use('/article', article.routes(), article.allowedMethods());
router.use('/api', api.routes(), api.allowedMethods());


module.exports = router;
