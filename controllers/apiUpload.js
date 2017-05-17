const path = require('path');
const uploadFile = require('./../utils/upload').upload;


const upload = async (ctx) => {
  let result = { code: 1000, message: '上传文件失败' };
  const serverFilePath = path.join(__dirname, './../static/uploads');
  result = await uploadFile(ctx, {
    fileType: 'article', // common or album
    path: serverFilePath,
  });
  console.log('result: ', result);
  ctx.body = result;
  return true;
};


module.exports = {
  upload,
};
