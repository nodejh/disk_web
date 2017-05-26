const uuid = require('uuid/v1');
const Users = require('./../models/Users');


const isLogin = async (ctx) => {
  console.log('ctx.session: ', ctx.session);
  if (ctx.session && ctx.session.uid) {
    ctx.body = {
      code: 0,
      isLogin: true,
    };
  } else {
    ctx.body = {
      code: 0,
      isLogin: false,
    };
  }
};


const login = async (ctx) => {
  const { phone, password } = ctx.request.body;
  console.log('phone, password ', phone, password);
  try {
    const user = await Users.find({ phone });
    console.log('user: ', user);
    // const user = await query(sql, [phone]);
    if (user.length === 0) {
      ctx.body = {
        code: 100,
        message: '用户不存在',
      };
      return false;
    }
    if (user[0].password !== password) {
      ctx.body = {
        code: 101,
        message: '密码错误',
      };
      return false;
    }
    ctx.session.uid = user[0].id;
    ctx.body = { code: 0, message: '登录成功' };
  } catch (e) {
    ctx.body = {
      code: 500,
      message: e.message || '登录失败，请重试',
    };
  }
  return true;
};


const sign = async (ctx) => {
  const { phone, password, name } = ctx.request.body;
  try {
    const user = await Users.find({ phone });
    if (user.length > 0) {
      ctx.body = {
        code: 101,
        message: '手机号已存在，您可以直接登录',
      };
      return false;
    }
    const uid = uuid();
    const newUser = new Users({
      id: uid,
      name,
      phone,
      password,
      date: new Date(),
      avatar: 'logo.png',
    });
    await newUser.save();
    ctx.session.uid = uid;
    ctx.body = { code: 0, message: '注册成功' };
  } catch (e) {
    ctx.body = {
      code: 500,
      message: e.message || '注册失败，请重试',
    };
  }
  return true;
};


const logout = async (ctx) => {
  ctx.session = null;
  ctx.body = {
    code: 0,
    message: '退出登录成功',
  };
};


module.exports = {
  isLogin,
  login,
  sign,
  logout,
};
