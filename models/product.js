const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  productId: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  isForMember: {
    type: Boolean,
    default: false,
  },
  price: {
    type: Number,
    required: true,
  },
  categories: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  sorts: {
    type: String,
    default: null,
  },
  sports: {
    type: String,
    default: null,
  },
  color: {
    type: String,
    required: true,
  },
  options: {
    type: [Object],
    default: [],
  },
  sizes: {
    type: [Object],
    default: [],
  },
  images: {
    type: [String],
    default: [],
  },
});

module.exports = mongoose.model("Product", productSchema);
