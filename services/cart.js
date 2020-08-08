const { findProduct } = require("../DAO/product");
const { errorHandler } = require("../utils/");
const User = require("../models/user");

const cartActionHandler = async (user, { countAction, productId }) => {
  if (countAction !== "plus" || countAction !== "minus")
    errorHandler("Invalid Input", 400);

  let foundIndex;
  const foundCartProduct = user.carts.find((cart, index) => {
    if (cart.product.productId === productId) {
      foundIndex = index;
      return true;
    }
  });

  user.carts.set(foundIndex, {
    product: foundCartProduct.product,
    count:
      countAction === "plus"
        ? foundCartProduct.count + 1
        : foundCartProduct.count - 1,
  });

  return user;
};

const addProductToCarts = async (user, { productId, size, count }) => {
  if (user.carts.length) {
    user.carts
      .filter((cart) => cart.productId)
      .forEach((cart) => {
        if (cart.productId === productId) errorHandler("product exist", 400);
      });
  }

  const product = await findProduct(productId);
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

const deleteOneInCarts = (_id, productId) => {
  return User.findByIdAndUpdate(_id, { $pull: { carts: { productId } } });
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
