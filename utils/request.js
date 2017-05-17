const http = require('http');
const iconv = require('iconv-lite');

// options http请求设置的参数；返回请求结果
const request = (postData, options) => {
  console.log('发送HTTP请求');
  console.log(options);
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      console.log(`STATUS: ${res.statusCode}`);
      console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
      let body = '';

      res.on('data', (chunk) => {
        body += iconv.decode(chunk, 'utf8');
      });

      res.on('end', () => {
        console.log(`BODY: ${body}`);
        resolve({
          headers: res.headers,
          body,
        });
      });
    });

    req.on('error', (error) => {
      console.error(error);
      reject(error);
    });

    req.write(postData);
    req.end();
  });
};


module.exports = request;
