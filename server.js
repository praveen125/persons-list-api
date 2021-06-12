const express = require("express");
const connectDB = require("./config/db");
const path = require("path");
const cors = require("cors");

const app = express();

connectDB();

app.use(express.json());
app.use(cors());

app.use(require("./routes/persons"));

app.get("/", (req, res) => {
  res.send("Welcome to Persons List API praveen");
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
