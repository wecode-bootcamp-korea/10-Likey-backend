const Product = require("../models/product");

module.exports = async () => {
  await Product.deleteMany();
};
