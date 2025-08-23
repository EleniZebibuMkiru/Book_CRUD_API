const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "bookapi_db",       // your MySQL username
  password: "bookapi_db",       // your MySQL password
  database: "bookapi_db"
});

db.connect((err) => {
  if (err) {
    console.error(" Failed to connect to MySQL:", err);
  } else {
    console.log(" Connected to MySQL database");
  }
});

module.exports = db;
