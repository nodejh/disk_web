const mongodb = require('./../utils/mongodb');

const Schema = mongodb.Schema;
const usersSchema = new Schema({
  id: Schema.Types.String,
  name: Schema.Types.String,
  phone: Schema.Types.String,
  password: Schema.Types.String,
  avatar: Schema.Types.String,
  date: { type: Date, default: Date.now },
});


const Users = mongodb.model('Users', usersSchema);


module.exports = Users;
