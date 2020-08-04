const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Product = require("./product").schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  carts: {
    type: [Object],
    default: [],
  },
  likes: [{ type: Schema.Types.ObjectId, ref: "Product" }],
});

module.exports = mongoose.model("User", userSchema);
