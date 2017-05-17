const path = require('path');
const uploadFile = require('./../utils/upload').upload;


const upload = async (ctx) => {
  const serverFilePath = path.join(__dirname, './../static/uploads');
  const result = await uploadFile(ctx, {
    fileType: 'article', // common or album
    path: serverFilePath,
  });
  console.log('result: ', result);
  ctx.body = {
    success: result.success,
    msg: result.message,
    file_path: `/uploads/${result.fileType}/${result.fileName}`,
  };
  return true;
};


module.exports = {
  upload,
};
