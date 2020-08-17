const Product = require("../models/product");
const { errorGenerator } = require("../utils/");

const getProducts = async (req, res, next) => {
  try {
    const { offset, limit, color = null, gender = null } = req.query;

    const searchOptions = {
      [color && "color"]: color,
      [gender && "gender"]: gender,
    };

    const products = await Product.find(searchOptions).skip(Number(offset))
      .limit(Number(limit));

    res.status(200).json({
      message: "products",
      products,
    });
  } catch (err) {
    next(err);
  }
};

const getProductTitles = async (req, res, next) => {
  try {
    const products = await Product.find().limit(30);

    res.status(200).json({
      message: "titles",
      titles: products.map(({ title, productId }) => {
        return {
          title,
          productId,
        };
      }),
    });
  } catch (err) {
    next(err);
  }
};

const getProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const product = await Product.findOne({ productId });

    if (!product) errorGenerator("Product not exist", 404);

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

module.exports = { getProducts, getProductTitles, getProduct };
