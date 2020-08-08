const { findProducts, findProduct } = require("../DAO/product");
const { errorHandler } = require("../utils/");

const getProducts = async (req, res, next) => {
  try {
    const products = await findProducts(req.query);

    if (!products.length) errorHandler("Products not found", 404);

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
    const products = await findProducts();

    if (!products.length) errorHandler("Products not found", 404);

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
    const product = await findProduct(productId);

    if (!product) errorHandler("Product not exist", 404);

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
