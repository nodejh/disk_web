const url = require('url');
const request = require('./../utils/request');


const urlContent = async (ctx) => {
  const urlString = ctx.request.body.url;
  const urlParsed = url.parse(urlString);
  console.log('urlParsed: ', urlParsed);
  const options = {
    host: urlParsed.host,
    hostname: urlParsed.hostname,
    port: urlParsed.port,
    method: 'GET',
    path: urlParsed.path,
  };
  try {
    const res = await request('', options);
    const body = res.body.replace(/\s+/g, '');
    console.log('body: ', body);
    const title = body.substring(body.indexOf('<title>') + 7, body.indexOf('</title>'));
    ctx.body = {
      code: 0,
      data: {
        title,
        content: '',
      },
    };
  } catch (e) {
    console.error('e: ', e);
  }
};


module.exports = {
  urlContent,
};
