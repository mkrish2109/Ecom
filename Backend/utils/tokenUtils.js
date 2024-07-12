const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const getCryptoToken = (randomBytes = 40) => {
  return crypto.randomBytes(randomBytes).toString("hex");
};

const getTokenUser = (user) => {
  return {
    userId: user._id,
    name: user.fname + " " + user.lname,
    email: user.email,
    role: user.role,
  };
};

const getJWT = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });
};

const verifyJWT = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = { getJWT, getCryptoToken, getTokenUser, verifyJWT };
