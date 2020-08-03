const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // 'Access-Control-Allow-Origin' ,*: wild card
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE'); // to use specific http methods
  res.setHeader('Access-Control-Allow-Headers', 'Origin, Accept, Content-Type, Authorization, X-Requested-With'); // it can receive these keys of the headers

  next(); // can be handled by routes
}); // CORS Error RESOLVED

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