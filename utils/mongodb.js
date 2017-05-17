const mongoose = require('mongoose');
const config = require('./../config/config');

mongoose.Promise = global.Promise;
mongoose.connect(config.mongodb);
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', () => {
  console.log('连接数据库成功');
});


module.exports = mongoose;
