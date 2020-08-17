const {
  getProductInCart,
  createNewProduct,
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
    let { user, body: { count } } = req;

    const [foundIndex, foundCartProduct] = getProductInCart(user, req.body);

    if (foundCartProduct) {
      user.carts.set(foundIndex, {
        ...foundCartProduct,
        count,
      });
    } else {
      const newProduct = await createNewProduct(req.body);
      user.carts.push(newProduct);
    }

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
