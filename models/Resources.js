const mongodb = require('./../utils/mongodb');

const Schema = mongodb.Schema;
const resourcesSchema = new Schema({
  title: String, // 资源标题
  urlPanduoduo: String, // 盘多多的 URL
  urlPanbaidu: String, // 百度网盘的 URL
  urlCurrentPage: String, // 当前页面的 URL
  categry: String, // 类别
  size: String, // 大小
  date: { type: Date, default: Date.now }, // 爬取日期
  publishDate: { type: Date, default: Date.now }, // 发布日期
  error: Schema.Types.Mixed,
});


const Resources = mongodb.model('Resources', resourcesSchema);


module.exports = Resources;
