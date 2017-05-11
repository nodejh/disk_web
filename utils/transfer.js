const uuid = require('uuid/v1');
const Users = require('./../models/Users');
const Resources = require('../models/Resources');
const Articles = require('../models/Articles');


const createAdminUser = async () => {
  try {
    const user = new Users({
      id: uuid(),
      name: '拇指搜',
      phone: '10000',
      password: '10000',
      avatar: 'logo.png',
      date: new Date(),
    });
    const res = await user.save();
    console.log('res: ', res);
  } catch (exception) {
    console.log('exception: ', exception);
  }
};


const updateUser = async () => {
  try {
    const res = await Users.update({ phone: '10000' }, { $set: { avatar: 'logo.png' } });
    console.log('res: ', res);
  } catch (exception) {
    console.log('exception: ', exception);
  }
};


const findUser = async () => {
  try {
    const res = await Users.find({}).skip(1).limit(1);
    console.log('res: ', res);
    // eslint-disable-next-line
    console.log('res: ', res[0]._id);
  } catch (exception) {
    console.log('exception: ', exception);
  }
};


const transfer = async () => {
  try {
    let i = 0;
    const count = await Resources.find({}).count();
    // console.log('count: ', count);
    while (i < count) {
      // eslint-disable-next-line
      const resource = await Resources.find({}).skip(i).limit(1);
      if (resource.length > 0) {
        // console.log('resource: ', resource);
        const article = new Articles({
          id: uuid(),
          title: resource[0].title, // 资源标题
          url: resource[0].urlPanbaidu, // 资源的 URL
          category: resource[0].categry ? `百度网盘${resource[0].categry}` : '百度网盘其他', // 类别
          size: resource[0].size === '---' ? '未知' : resource[0].size, // 大小
          date: resource[0].date, //  发布日期
          publishDate: resource[0].publishDate, // 资源发布日期
          content: `${resource[0].title} ${resource[0].urlPanbaidu}`,
          user: {
            uid: 'b5de75b0-35fe-11e7-9beb-617a1776ffcd',
            name: '拇指搜',
            avatar: 'logo.png',
          }, // 发布用户的信息
          history: [],
        });
        // eslint-disable-next-line
        await article.save();
        // console.log('res: ', JSON.stringify(res));
      }
      i += 1;
      console.log(`${i}/${count}`);
    }
  } catch (exception) {
    console.log('exception: ', exception);
  }
};


// createAdminUser();
// updateUser();
// findUser();
transfer();
