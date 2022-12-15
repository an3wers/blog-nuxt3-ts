// import mysql from "mysql2";
// const tunnel = require('tunnel-ssh');

export default defineEventHandler(async (event) => {

  // const query = getQuery(event)
  // console.log('QUERY', query)
  
  // const db = {
  //   host: "localhost",
  //   user: "c47379_old_santur_ru",
  //   password: "RuCwaWugjuseg42",
  //   database: "c47379_old_santur_ru",
  // };

  // const config = {
  //   host: 'h29.netangels.ru',
  //   port: 22,
  //   username: 'c47379 ',
  //   password: 'TeYruMivhodoy56'
  // };

  // const connect = await mysql.createConnection(db);
  // const [rows, fields] = await connect.execute("SELECT * FROM sd67f523gj_posts WHERE sd67f523gj_posts.ID = '2'")
  // const response = connect.execute(
    //   "SELECT * FROM sd67f523gj_posts WHERE sd67f523gj_posts.ID = '2'", (err, result, fields) => {
    //     // console.log('Err', err)
    //     // console.log('Result', result)
    //     return {error: err, res: result}
    //   }
    // );

    // console.log(query);

    // const pool = mysql.createPool({
    //   ...db,
    //   waitForConnections: true,
    //   connectionLimit: 10,
    //   queueLimit: 0,
    // });

    // const promisePool = pool.promise();

    // const [rows] = await promisePool.query(`SELECT * FROM sd67f523gj_posts WHERE sd67f523gj_posts.ID = ${query.id}`);

  

  // return rows;
});
