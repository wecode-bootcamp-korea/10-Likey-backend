const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

module.exports = mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});
