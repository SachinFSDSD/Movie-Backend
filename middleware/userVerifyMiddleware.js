const constanst = require("../utils/constans.js");
const User = require("../module/userModule.js");

validateUserRequest = async (req, res, next) => {
  if (!req.body.name) {
    return res.status(400).send({
      message: "Failed !name is not given",
    });
  }

  if (!req.body.userId) {
    return res.status(400).send({
      message: "Failed !userId is not given",
    });
  }

  if (!req.body.password) {
    return res.status(400).send({
      message: "Failed !password is not given",
    });
  }

  if (!req.body.email) {
    return res.status(400).send({
      message: "Failed !email is not given",
    });
  }
  const Validemail = await User.findOne({ email: req.params.email });
  if (Validemail) {
    res.status(500).send({
      message:
        "Email already exist with other userId please try different email ",
    });
  }

  if (!req.body.userType) {
    return res.status(400).send({
      message: "Failed !usertype is not given",
    });
  }
  const userType = req.body.userType;
  const userTypes = [constanst.userType.customer, constanst.userType.admin];
  if (!userTypes.includes(userType)) {
    return res.status(400).send({
      message:
        "Failed !User status provided is invalid.Valid values are CUSTOMER | ADMIN",
    });
  }

  if (!req.body.userStatus) {
    return res.status(400).send({
      message: "Failed !userStatus is not given",
    });
  }

  const userStatus = req.body.userStatus;
  const userStatustype = [
    constanst.userStatus.approved,
    constanst.userStatus.rejected,
    constanst.userStatus.pending,
  ];

  if (!userStatustype.includes(userStatus)) {
    return res.status(400).send({
      message:
        "Failed! UserStatus provided is invalid .Valid vlaues are PENDING | APPROVED | REJECTED",
    });
  }

  next();
};

const userValidateMiddleWare = {
  validateUserRequest: validateUserRequest,
};

module.exports = userValidateMiddleWare;
