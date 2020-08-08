const { errorHandler } = require("../utils/");
const User = require("../models/user");
const Product = require("../models/product");
const bodyParser = require("body-parser");

const cartActionHandler = async (user, { countAction, productId }) => {
  if (typeof countAction !== "boolean") errorHandler("Invalid Input", 400);

  let foundIndex;
  const foundCartProduct = user.carts.find((cart, index) => {
    if (cart.productId === productId) {
      foundIndex = index;
      return true;
    }
  });

  const changedCount = foundCartProduct.count + (countAction ? +1 : -1);

  user.carts.set(foundIndex, {
    ...foundCartProduct,
    count: changedCount,
  });

  return user;
};

const addProductToCarts = async (user, { productId, size, count }) => {
  let foundIndex;
  let changedCount;
  const foundCartProduct = user.carts.find((cart, index) => {
    if (cart.productId === productId && cart.size === size) {
      foundIndex = index;
      changedCount = count;
      return true;
    }
  });

  if (foundCartProduct) {
    user.carts.set(foundIndex, {
      ...foundCartProduct,
      count: changedCount,
    });

    return user;
  }

  const product = await Product.findOne({ productId });
  if (!product) errorHandler("Product not found", 404);

  const { title, price, imageUrl } = product;
  const cartProduct = {
    title,
    price,
    imageUrl,
    count,
    size,
    productId,
  };

  user.carts.push(cartProduct);

  return user;
};

const deleteOneInCarts = (_id, productId, size) => {
  return User.findByIdAndUpdate(_id, { $pull: { carts: { productId, size } } });
};

const deleteAllinCarts = (_id) => {
  return User.findByIdAndUpdate(_id, { carts: [] });
};

module.exports = {
  cartActionHandler,
  addProductToCarts,
  deleteOneInCarts,
  deleteAllinCarts,
};
