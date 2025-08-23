// controllers/bookController.js
const db = require("../database/db");
exports.getAllBooks = (req, res) => {
  db.query("SELECT * FROM books", (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err });
    }
    res.json(results);
  });
};

exports.getBookById = (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM books WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ message: "Database error", error: err });
    if (results.length === 0) return res.status(404).json({ message: "Book not found" });
    res.json(results[0]);
  });
};




exports.welcome = (req, res) => {
  res.send("Welcome to the Book API");
};


exports.createBook = (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).json({ message: "Title and author are required" });
  }

  db.query("INSERT INTO books (title, author) VALUES (?, ?)", [title, author], (err, result) => {
    if (err) return res.status(500).json({ message: "Database error", error: err });
    const newBook = { id: result.insertId, title, author };
    res.status(201).json(newBook);
  });
};

exports.updateBook = (req, res) => {
  const id = req.params.id;
  const { title, author } = req.body;

  db.query("SELECT * FROM books WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ message: "Database error", error: err });
    if (results.length === 0) return res.status(404).json({ message: "Book not found" });

    db.query(
      "UPDATE books SET title = ?, author = ? WHERE id = ?",
      [title || results[0].title, author || results[0].author, id],
      (err2) => {
        if (err2) return res.status(500).json({ message: "Update failed", error: err2 });
        res.json({ id, title: title || results[0].title, author: author || results[0].author });
      }
    );
  });
};

exports.deleteBook = (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM books WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ message: "Database error", error: err });
    if (result.affectedRows === 0) return res.status(404).json({ message: "Book not found" });
    res.status(204).send();
  });
};
