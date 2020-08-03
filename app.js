const express = require("express");
const hpp = require("hpp");
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(hpp());
app.use(helmet());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(bodyParser.json());

// routes
// middleware

// general error handling
app.use((error, req, res, next) => {
  console.log(error);
  const { statusCode, message } = error;
  const status = statusCode || 500;
  res.status(status).json({ message });
});

module.exports = app;
