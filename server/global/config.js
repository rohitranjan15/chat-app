const mysql = require("mysql2");

// Create the connection to the database
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "chat-app",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool.promise();
