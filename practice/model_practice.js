const User = require("../models/user");
const Product = require("../models/product");
const { find } = require("../models/product");

module.exports = (async function () {
  try {
    const findUser = await User.findById("5f27b8f2530a72498d27a0e1");
    const findProduct = await Product.findById("5f27c975ce02bd36fe9fb0e3");
    findUser.carts.push({ product: findProduct, count: 1 });
    findUser.likes.push(findProduct);
    /* const user = new User({
      email: "dhghrms",
      password: "12345",
      name: "오호근",
      phone: "01012341234",
    }); */
    await findUser.save();
  } catch (err) {
    console.log(err);
  }
})();
