// app.js
const express = require("express");
const app = express();
app.use(express.json());
const db = require("./database/db"); // this will automatically connect


// Route
const bookRoutes = require("./routes/bookRoutes");
app.use("/", bookRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
