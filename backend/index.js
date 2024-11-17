require("dotenv").config(); // Load environment variables

const mongoose = require("mongoose");
const cookie = require("cookie-parser");
const userRouter = require("./routes/UserRoutes");
const noteRouter = require("./routes/NoteRoutes");
const port = process.env.PORT || 3000;

// Directly use the connection string
const config = process.env.MONGODB_CONNECTION_STRING;

mongoose.connect(config) 
  .then(() => console.log("MongoDB connected!"))
  .catch(err => console.error("MongoDB connection error:", err));

const express = require("express");
const cors = require("cors");
const app = express();

app.use(cookie());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/notes", noteRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Webserver app listening on http://localhost:${port}/`);
});
