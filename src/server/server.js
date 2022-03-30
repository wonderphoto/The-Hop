require('dotenv').config();

// node modules
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

// db async helper function
const connectDB = require('./config/db');
connectDB();

// express
const PORT = process.env.PORT || 3000;
const app = express();


// handle requests for static files
app.use("/assets", express.static("../../build"));

// json parser
app.use(express.json());

// define route handlers

// home
app.get("/", (req, res) => {
  return res.sendFile(path.resolve(__dirname, "../../public/index.html"));
});

// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Global error handler caught unknown middleware error",
    status: 400,
    message: { err: "An error occurred" },
  };

  // sets to default err obj unless an err param is defined
  const errorObj = Object.assign({}, defaultErr, err);
  console.log("received error: ", err);

  const { status, message } = errorObj;
  return res.status(status).json({ message });
});

app.listen(PORT, () => {
  console.log("Server started on PORT 3000");
});

module.exports = app;
