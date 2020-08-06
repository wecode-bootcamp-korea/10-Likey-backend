// const Product = require("../models/product");
const mongoose = require("mongoose");
const { findProducts, findProduct } = require("../services/product");

exports.getProducts = async (req, res, next) => {
  try {
    const products = await findProducts(req.query);

    if (!products) {
      const error = new Error("Products not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      message: "products",
      products,
    });
  } catch (err) {
    next(err);
  }
};

exports.getProductTitles = async (req, res, next) => {
  try {
    const products = await findProducts();

    if (!products) {
      const error = new Error("Products not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      message: "titles",
      titles: products.map((product) => product.title),
    });
  } catch (err) {
    next(err);
  }
};

exports.getProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const product = await findProduct(productId);
    if (!product) {
      const error = new Error("Product not exist");
      error.statusCode = 404;
      throw error;
    }
    const { images, title, price, categories, sizes, options } = product;
    const result = {
      images,
      title,
      categories,
      price,
      sizes,
      options,
    };

    res.status(200).json({ messages: "", product: result });
  } catch (err) {
    next(err);
  }
};
