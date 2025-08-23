const db = require("./database/db"); // Make sure this path points to your db.js

const book = `
  CREATE TABLE IF NOT EXISTS books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL
  )
`;

db.query(book, (err, result) => {
  if (err) {
    console.error(" Error creating 'books' table:", err);
  } else {
    console.log(" 'books' table created or already exists.");
  } 
  db.end(); // Close the connection after creating table
});
