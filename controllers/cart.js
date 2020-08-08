const { errorHandler } = require("../utils/");
const { findUserById, createOrUpdateUser } = require("../DAO/user");
const { findProduct } = require("../DAO/product");
const {
  cartActionHandler,
  addProductToCarts,
  deleteOneInCarts,
  deleteAllinCarts,
} = require("../services/cart");

const getCarts = async (req, res, next) => {
  try {
    const user = await findUserById(req.userId);

    if (!user) errorHandler("User not found", 404);

    const { carts } = user;
    res.status(200).json({
      message: user.carts.length ? "carts" : "No carts",
      carts,
    });
  } catch (err) {
    next(err);
  }
};

const postCarts = async (req, res, next) => {
  try {
    let user = await findUserById(req.userId);

    if (!user) errorHandler("User not found", 404);

    user = req.body.countAction
      ? await cartActionHandler(user, req.body)
      : await addProductToCarts(user, req.body);

    await createOrUpdateUser(user);

    res.status(200).json({
      message: "SUCCESS",
      productId: req.body.productId,
    });
  } catch (err) {
    next(err);
  }
};

const deleteAll = async (req, res, next) => {
  try {
    const user = await findUserById(req.userId);

    if (!user) errorHandler("User not found", 404);

    await deleteAllinCarts(req.userId);

    res.status(200).json({
      message: "all products deleted in carts",
    });
  } catch (err) {
    next(err);
  }
};

const deleteOne = async (req, res, next) => {
  try {
    const user = await findUserById(req.userId);

    if (!user) errorHandler("User not found", 404);

    await deleteOneInCarts(req.userId, req.params.productId);

    res.status(200).json({
      message: "product deleted",
      productId: req.params.productId,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getCarts, postCarts, deleteOne, deleteAll };
