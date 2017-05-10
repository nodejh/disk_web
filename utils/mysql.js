const mysql = require('mysql');
const config = require('./../config/config').mysql;


const pool = mysql.createPool({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database,
});


const query = (sql, values) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        resolve(err);
      } else {
        connection.query(sql, values, (errQuery, rows) => {
          if (errQuery) {
            reject(errQuery);
          } else {
            resolve(rows);
          }
          connection.release();
        });
      }
    });
  });
};


module.exports = {
  query,
};
