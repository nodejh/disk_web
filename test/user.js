const Users = require('./../models/Users');
const Articles = require('./../models/Articles');


async function findUser() {
  try {
    console.log('a');
    const user = await Users.find({ phone: '1' });
    console.log('user: ', user);
    console.log('b');
  } catch (e) {
    console.log('e: ', e);
  }
  console.log('c');
}


findUser();
