import mysql from 'mysql2';

const connectionPool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 13306,
  connectionLimit: 10,
});

export default connectionPool.promise();
