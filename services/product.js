const Product = require("../models/product");

const findProducts = async (query = null) => {
  // const counts = await Product.find(query).countDocuments();
  // console.log(counts);
  return Product.find(query);
};

const findProduct = (productId) => {
  return Product.findOne({ productId });
};

module.exports = { findProducts, findProduct };
