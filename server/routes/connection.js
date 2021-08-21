const mysql = require("mysql");


const pool = mysql.createPool({
  timezone: 'UTC',
    dateStrings: [
        'DATE',
        'DATETIME'
    ],
  connectionLimit: 10,
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  database: process.env.DATABASE,
  password: process.env.DBPASSWORD,
  multipleStatements: true, //for more than one query in a get route
  debug: false
});

console.log("Testing",pool)
 
module.exports = pool; 

