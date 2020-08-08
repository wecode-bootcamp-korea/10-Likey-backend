const Product = require("../models/product");

const findProducts = (query = null) => {
  return Product.find(query);
};

const findProduct = (productId) => {
  return Product.findOne({ productId });
};

module.exports = { findProducts, findProduct };
