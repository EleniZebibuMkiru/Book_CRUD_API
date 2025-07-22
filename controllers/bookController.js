// controllers/bookController.js

let books = [];
let currentId = 1;

exports.welcome = (req, res) => {
  res.send(" Welcome to the Book API");
};

exports.getAllBooks = (req, res) => {
  res.json(books);
};
//getBookById
exports.getBookById = (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ message: "Book not found" });
  res.json(book);
};
//createBook
exports.createBook = (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).json({ message: "Title and author are required" });
  }
  const newBook = { id: currentId++, title, author };
  books.push(newBook);
  res.status(201).json(newBook);
};
//updateBook
exports.updateBook = (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ message: "Book not found" });

  const { title, author } = req.body;
  if (title) book.title = title;
  if (author) book.author = author;

  res.json(book);
};
//deleteBook 
exports.deleteBook = (req, res) => {
  const index = books.findIndex(b => b.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Book not found" });

  books.splice(index, 1);
  res.status(204).send();
};
