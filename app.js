// Import the Express library (framework used to build APIs)
const express = require("express");

// Create an Express app object that will handle requests and responses
const app = express();

// Define the port number the server will run on (http://localhost:3000)
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

let books = [];         //  empty array Temporary book storage
let currentId = 1;      // Unique ID for each book start from 1 and increment by 1 

// Welcome message at root path
app.get("/", (req, res) => {
  res.send("📘 Welcome to the Book API");
});

// GET all books
app.get("/books", (req, res) => {
  res.json(books);
});

// GET book by ID
app.get("/books/:id", (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ message: "Book not found" });
  res.json(book);
});

// POST create a new book
app.post("/books", (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).json({ message: "Title and author are required" });
  }
  const newBook = { id: currentId++, title, author };
  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT update a book
app.put("/books/:id", (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ message: "Book not found" });

  const { title, author } = req.body;
  if (title) book.title = title;
  if (author) book.author = author;

  res.json(book);
});

// DELETE a book
app.delete("/books/:id", (req, res) => {
  const index = books.findIndex(b => b.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Book not found" });

  books.splice(index, 1);
  res.status(204).send();
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
