const express = require("express");

const cartController = require("../controllers/cart");
const { isAuth } = require("../middleware/");

const router = express.Router();

router.get("/", isAuth, cartController.getCarts);
router.post("/", isAuth, cartController.postCarts);
router.delete("/", isAuth, cartController.deleteAll);
router.delete("/:productId", isAuth, cartController.deleteOne);

module.exports = router;
