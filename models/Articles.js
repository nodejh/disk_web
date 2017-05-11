const mongodb = require('./../utils/mongodb');

const Schema = mongodb.Schema;
const articlesSchema = new Schema({
  id: String,
  title: String, // 资源标题
  url: String, // 资源的 URL
  category: String, // 类别
  size: String, // 大小
  date: { type: Date, default: Date.now }, //  该网站发布日期
  publishDate: { type: Date, default: Date.now }, // 百度云发布日期
  user: {
    uid: Schema.Types.String,
    name: Schema.Types.String,
    avatar: Schema.Types.String,
  }, // 发布用户的信息
  history: [
    {
      user: {
        uid: Schema.Types.String,
        name: Schema.Types.String,
        avatar: Schema.Types.String,
      },
      article: {
        title: Schema.Types.String,
        content: Schema.Types.String,
      },
      date: { type: Date, default: Date.now }, // 存为历史记录的日期
    },
  ], // 某篇文章的历史记录
});


const Resources = mongodb.model('Articles', articlesSchema);


module.exports = Resources;
