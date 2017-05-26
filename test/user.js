const Users = require('./../models/Users');
const Articles = require('./../models/Articles');


async function findUser() {
  try {
    console.log('a');
    const user = await Articles.find({ title: '20140205开箱' });
    console.log('user: ', user);
    console.log('b');
  } catch (e) {
    console.log('e: ', e);
  }
  console.log('c');
}


findUser();
