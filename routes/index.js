const authRoutes = require("./auth");
const productRoutes = require("./product");
const cartRoutes = require("./cart");

const router = (app) => {
  app.use("/auth", authRoutes);
  app.use("/product", productRoutes);
  app.use("/cart", cartRoutes);
};

module.exports = router;
