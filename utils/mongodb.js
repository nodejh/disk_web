const mongoose = require('mongoose');
const config = require('./../config/config');

mongoose.Promise = global.Promise;
// mongoose.connect(config.mongodb);
// mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
// mongoose.connection.once('open', () => {
//   console.log('连接数据库成功');
//   console.log('MongoDB event open');
//   console.log('MongoDB connected [%s]', config.mongodb);
//
//   mongoose.connection.on('connected', function() {
//     console.log('MongoDB event connected');
//   });
//
//   mongoose.connection.on('disconnected', function() {
//     console.log('MongoDB event disconnected');
//   });
//
//   mongoose.connection.on('reconnected', function() {
//     console.log('MongoDB event reconnected');
//   });
//
//   mongoose.connection.on('error', function(err) {
//     console.error('MongoDB event error: ' + err);
//   });
// });

const connectWithRetry = () => {
  console.log('connecting...');
  return mongoose.connect(config.mongodb, (err) => {
    if (err) {
      console.error('Failed to connect to mongo on startup - retrying in 5 sec', err);
      setTimeout(connectWithRetry, 5000);
    }
  });
};
connectWithRetry();


module.exports = mongoose;

// const mongoose = require('mongoose');
//
// mongoose.Promise = global.Promise;
// module.exports = mongoose;
