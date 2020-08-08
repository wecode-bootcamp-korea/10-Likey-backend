const bcrypt = require("bcryptjs");

module.exports = async function checkPassword(inputPassword, userPassword) {
  return bcrypt.compare(inputPassword, userPassword);
};
