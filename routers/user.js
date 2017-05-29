const router = require('koa-router')();
const user = require('./../controllers/user');


router.get('/write', user.writePage);
router.get('/write_subject', user.writeSubjectPage);
router.get('/list', user.list);

module.exports = router;
