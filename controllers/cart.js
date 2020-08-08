const {
  cartActionHandler,
  addProductToCarts,
  deleteOneInCarts,
  deleteAllinCarts,
} = require("../services/cart");

const getCarts = async (req, res, next) => {
  try {
    const { carts } = req.user;
    res.status(200).json({
      message: carts.length ? "carts" : "No carts",
      carts,
    });
  } catch (err) {
    next(err);
  }
};

const postCarts = async (req, res, next) => {
  try {
    let { user } = req;

    user =
      typeof req.body.countAction === "boolean"
        ? await cartActionHandler(user, req.body)
        : await addProductToCarts(user, req.body);

    await user.save();

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
    await deleteAllinCarts(req.user);

    res.status(200).json({
      message: "all products deleted in carts",
    });
  } catch (err) {
    next(err);
  }
};

const deleteOne = async (req, res, next) => {
  try {
    await deleteOneInCarts(req.user, req.params.productId, req.body.size);

    res.status(200).json({
      message: "product deleted",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getCarts, postCarts, deleteOne, deleteAll };
