const Product = require("../models/product");
const products = require("../scraper/products.json");

module.exports = async () => {
  for (p of products) {
    const product = new Product(p);
    try {
      const result = await product.save();
      result && console.log("succeed", product.productId);
    } catch (err) {
      console.log(err);
    }
  }
};
