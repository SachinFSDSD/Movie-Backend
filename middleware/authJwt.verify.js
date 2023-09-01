const jwt = require("jsonwebtoken");
const User = require("../module/userModule");
const constanst = require("../utils/constans");
const secrtKeyConfig = require("../config/secrtKey.config");

isAdmin = async (req, res, next) => {
  var user = await User.findOne({ userId: req.userId });

  if (user && user.userType == constanst.userType.admin) {
    next();
  } else {
    res.status(403).send({
      message: "Admin role require for this operation ",
    });
    return;
  }
};

verifyToken = async (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "Not a valid token",
    });
  }

  jwt.verify(token, secrtKeyConfig.secretkey, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unathorized " + err.message,
      });
    }
    console.log((req.userId = decoded.id));
    next();
  });
};

const isAdminorClient = async (req, res, next) => {
  const user = await User.findOne({ userId: req.userId });

  if (
    (user && user.userType == constanst.userType.admin) ||
    user.userType == constanst.userType.customer
  )
    next();
  else {
    return res.status(403).send({
      message: "Require Admin or Client Role!",
    });
  }
};

const authjwt = {
  isAdmin: isAdmin,
  verifyToken: verifyToken,
  isAdminorClient: isAdminorClient,
};

module.exports = authjwt;
