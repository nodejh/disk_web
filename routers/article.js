const router = require('koa-router')();
const article = require('./../controllers/article');


router.get('/detail/:id', article.detailPage);
router.get('/edit/:id', article.editPage);


module.exports = router;
