const router = require('koa-router')();
const article = require('./../controllers/article');


router.get('/detail/:id', article.detailPage);


module.exports = router;
