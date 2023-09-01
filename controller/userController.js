const User = require("../module/userModule");
const userConvert = require("../utils/userConstant");

exports.getAllUser = async (req, res) => {
  try {
    const user = await User.find();
    if (user) {
      return res.status(200).send(userConvert.userObject(user));
    }
  } catch (error) {
    return res.status(500).send({
      message: "User not find" + error.message,
    });
  }
};

exports.getuserById = async (req, res) => {
  const userReqId = {
    _id: req.params.id,
  };
  try {
    const user = await User.findOne(userReqId);
    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send({
      message: "Cound not fetch user as internal error ocuured" + error.message,
    });
  }
};

exports.updateUser = async (req, res) => {
  const savedUser = await User.findOne({ _id: req.params.id });

  if (!savedUser) {
    return res.status(400).send({
      message: "The user you are looking for is not exist",
    });
  }

  savedUser.name = req.body.name != undefined ? req.body.name : savedUser.name;
  savedUser.userId =
    req.body.userId != undefined ? req.body.userID : savedUser.userId;
  savedUser.password =
    req.body.password != undefined ? req.body.password : savedUser.password;
  savedUser.email =
    req.body.email != undefined ? req.body.email : savedUser.email;
  savedUser.userType =
    req.body.userType != undefined ? req.body.userType : savedUser.userType;
  savedUser.userStatus =
    req.body.userStatus != undefined
      ? req.body.userStatus
      : savedUser.userStatus;

  try {
    var updateuser = await savedUser.save();

    return res.status(200).send(updateuser);
  } catch (error) {
    res.status(500).send({
      message: "Internal error ocuured" + error.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.deleteOne({
      _id: req.params.id,
    });
    return res.status(200).send({
      message: "Succesfully deleted the user",
    });
  } catch (error) {
    return res.status(500).send({
      message: "Given id is not valid",
    });
  }
};
