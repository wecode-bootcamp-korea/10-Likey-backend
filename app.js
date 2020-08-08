const express = require("express");
const hpp = require("hpp");
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan")("dev");

const router = require("./routes");

const app = express();
app.use(bodyParser.json());
app.use(hpp());
app.use(helmet());
app.use(cors());
app.use(logger);

// routes
router(app);

// middleware

// general error handling
app.use((error, req, res, next) => {
  const { statusCode, message } = error;
  const status = statusCode || 500;
  error.statusCode = statusCode || 500;
  console.log(error);
  res.status(status).json({ message });
});

module.exports = app;
