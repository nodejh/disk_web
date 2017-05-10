const router = require('koa-router')();

const index = require('./index');
const api = require('./api');


router.use('/', index.routes(), index.allowedMethods());
router.use('/api/v0.1', api.routes(), api.allowedMethods());


module.exports = router;
