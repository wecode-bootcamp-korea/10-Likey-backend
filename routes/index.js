const authRoutes = require("./auth");
const productRoutes = require("./product");

const router = (app) => {
  app.use("/auth", authRoutes);
  app.use("/product", productRoutes);
};

module.exports = router;
