const jwt = require("jsonwebtoken");

const generateAccessToken = ({ id, name }) => {
  return jwt.sign({ id, name }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

module.exports = {
  generateAccessToken,
};
