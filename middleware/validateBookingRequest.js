const ObjectId = require("mongoose").Types.ObjectId;
const Theater = require("../module/theater.module");

validateBookingRequest = async (req, res, next) => {
  if (!req.body.theaterId) {
    return res.status(400).send({
      message: "the theater Id is not provided",
    });
  }

  if (!ObjectId.isValid(req.body.theaterId)) {
    return res.status(400).send({
      message: "Failed ! Theater Id is not valid",
    });
  }

  if (!req.body.movieId) {
    return res.status(400).send({
      message: "Failed ! movieId is not provided",
    });
  }
  if (!ObjectId.isValid(req.body.movieId)) {
    return res.status(400).send({
      message: "Failed ! movieId is not valid",
    });
  }

  // const userid = await User.findOne({ userId: req.userId });
  // req.body.userId = userid;
  // if (!userid) {
  //   return res.status(400).send({
  //     message: "Failed ! user Id is not provided",
  //   });
  // }

  // if (!ObjectId.isValid(userid)) {
  //   return res.status(400).send({
  //     message: "Failed ! userId is not valid",
  //   });
  // }

  const theater = await Theater.findOne({ _id: req.body.theaterId });

  if (theater == null) {
    return res.status(404).send({
      message: "Failed! Theater passed does not exist",
    });
  }

  if (!req.body.noOfSeats) {
    return res.status(400).send({
      message: "Failed ! No of seats is not provided",
    });
  }
  next();
};

const verifyBookingReqBody = {
  validateBookingRequest: validateBookingRequest,
};

module.exports = verifyBookingReqBody;
