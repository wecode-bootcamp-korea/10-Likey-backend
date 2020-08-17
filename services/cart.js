const { errorGenerator } = require("../utils/");
const User = require("../models/user");
const Product = require("../models/product");

const getProductInCart = (user, { productId, size }) => {
  let foundIndex;
  const foundCartProduct = user.carts.find((cart, index) => {
    if (cart.productId === productId && cart.size === size) {
      foundIndex = index;
      return true;
    }
  });

  return [foundIndex, foundCartProduct];
};

const createNewProduct = async ({ productId, size, count }) => {
  const product = await Product.findOne({ productId });
  if (!product) errorGenerator("Product not found", 404);

  const { title, price, imageUrl } = product;
  const newProduct = {
    title,
    price,
    imageUrl,
    count,
    size,
    productId,
  };

  return newProduct;
};

const deleteOneInCarts = (_id, productId, size) => {
  return User.findByIdAndUpdate(_id, { $pull: { carts: { productId, size } } });
};

const deleteAllinCarts = (_id) => {
  return User.findByIdAndUpdate(_id, { carts: [] });
};

module.exports = {
  getProductInCart,
  createNewProduct,
  deleteOneInCarts,
  deleteAllinCarts,
};
