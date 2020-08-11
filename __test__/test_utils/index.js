const axios = require("axios");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const connectDatabase = async () => {
  return mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
};

const disconnectDatabase = async () => {
  return mongoose.close();
};

const customAxios = async ({
  url = "http://localhost:8000",
  endpoint = "",
  method = "GET",
  token = "",
  data,
}) => {
  const urlWithEndpoint = url + endpoint;

  return axios({
    url: urlWithEndpoint,
    method,
    data,
    headers: { authorization: token },
  });
};

module.exports = {
  connectDatabase,
  disconnectDatabase,
  customAxios,
};
