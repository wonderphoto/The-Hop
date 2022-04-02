require('dotenv').config();

// node modules
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");

// routers
const userRouter = require("./routes/userRouter.js");
const eventRouter = require("./routes/eventRouter.js");
const sessionRouter = require("./routes/sessionRouter.js");

// express
const PORT = process.env.PORT || 3000;
const app = express();

const SQL_URI = `postgres://${process.env.POSTGRESQL_USER}:${process.env.POSTGRESQL_PASSWORD}@heffalump.db.elephantsql.com/${process.env.POSTGRESQL_USER}`


// handle requests for static files
app.use("/assets", express.static("../../build"));

// json parser
app.use(express.json());

// credential handling
app.use(cors({
  origin: ['http://localhost:8080'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// session & cookie handling
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    key: "userID",
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
      httpOnly: true,
      maxAge: parseInt(process.env.SESSION_MAX_AGE),
    },
  })
);

// define route handlers
app.use('/api/users', userRouter);
app.use('/api/events', eventRouter);
app.use('/auth', sessionRouter);

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
