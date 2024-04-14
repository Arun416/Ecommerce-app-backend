const mysql = require('mysql2/promise');
require('dotenv').config();

const db = mysql.createPool({
   connectionLimit: 100,
   host: process.env.DB_HOST,       //This is your localhost IP
   user:  process.env.DB_USERNAME,         // "newuser" created in Step 1(e)
   password:  process.env.DB_PASSWORD,  // password for the new user
   database:  process.env.DB_NAME,      // Database name
   port:  process.env.DB_PORT           // port name, "3306" by default
})

db.getConnection( (err, connection)=> {
   if (err) throw (err)
   console.log ("DB connected successful: " + connection.threadId)
})

module.exports = db