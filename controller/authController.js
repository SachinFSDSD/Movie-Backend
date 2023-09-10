const jwt = require("jsonwebtoken");
const User = require("../module/userModule");
const bcrypt = require("bcryptjs");
const config = require("../config/secrtKey.config");

exports.signUp = async (req, res) => {
  const reqFiled = {
    name: req.body.name,
    userId: req.body.userId,
    password: bcrypt.hashSync(req.body.password, 9),
    email: req.body.email,
    userType: req.body.userType,
    userStatus: req.body.userStatus,
  };
  const user = await User.create(reqFiled);
  const response = {
    name: user.name,
    userId: user.userId,
    email: user.email,
    userType: user.userType,
    userStatus: user.userStatus,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
  try {
    if (!response) {
    } else {
      return res.status(200).send(response);
    }
  } catch (error) {
    return res.status(500).send({
      message: "Error while entering into db " + error.message,
    });
  }
};

exports.signIn = async (req, res) => {
  const user = await User.findOne({ userId: req.body.userId });

  if (!user) {
    res.status(400).send({
      message: "UserId does not exit ",
    });
    return;
  }

  if (user.userStatus !== "APPROVED") {
    res.status(200).send({
      message: "cannot login as this userId is not approveed or pending",
    });
    return;
  }

  var password = bcrypt.compareSync(req.body.password, user.password);

  if (!password) {
    return res.status(401).send({
      accessToken: null,
      message: "Password is invalid ",
    });
  }

  console.log(user.userId);
  var token = jwt.sign({ id: user.userId }, config.secretkey, {
    expiresIn: 86400,
  });

  res.status(200).send({
    name: user.name,
    userId: user.userId,
    email: user.email,
    userType: user.userType,
    userStatus: user.userStatus,
    accessToken: token,
  });
};
