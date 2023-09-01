const Booking = require("../module/booking.module");
const constans = require("../utils/constans");
const User = require("../module/userModule");

exports.getAllbookings = async (req, res) => {
  const user = await User.findOne({ userId: req.userId });

  const obj = {};

  if (user.userType == constans.userType.admin) {
  } else {
    obj.userId = user._id;
  }
  const bookings = await Booking.find(obj);
  return res.status(200).send(bookings);
};

exports.getAllbookingsById = async (req, res) => {
  const user = await User.findOne({ userId: req.userId });
  try {
    const bookings = await Booking.findOne({ _id: req.params.id });
    if (
      bookings.userId != user._id &&
      user.userType !== constans.userType.admin
    ) {
      res.status(400).send({
        message: "Access Denied",
      });
    }
    res.status(200).send(bookings);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({
      message: "Given booking id is not validx  ",
    });
  }
};
exports.updateBooking = async (req, res) => {
  const user = await User.findOne({ userId: req.userId });
  const bookingid = await Booking.findOne({ _id: req.params.id });

  if (!bookingid) {
    console.log("The id is looking for updation is not found");
  }
  if (
    bookingid.userId != user._id &&
    user.userType !== constans.userType.admin
  ) {
    res.status(400).send({
      message: "Access Denied",
    });
  }

  bookingid.theaterId =
    req.body.theaterId != undefined ? req.body.theaterId : bookingid.theaterId;
  bookingid.movieId =
    req.body.movieId != undefined ? req.body.movieId : bookingid.movieId;
  bookingid.userId =
    req.body.userId != undefined ? req.body.userId : bookingid.userId;
  bookingid.status =
    req.body.status != undefined ? req.body.status : bookingid.status;
  bookingid.timings =
    req.body.timings != undefined ? req.body.timings : bookingid.timings;
  bookingid.noOfSeats =
    req.body.noOfSeats != undefined ? req.body.noOfSeats : bookingid.noOfSeats;
  bookingid.totalCost =
    req.body.totalCost != undefined ? req.body.totalCost : bookingid.totalCost;

  try {
    const updateBooking = await bookingid.save();
    res.status(200).send(updateBooking);
  } catch (error) {
    res.status(500).send({
      message: "Cannot updat the fallowing" + error.message,
    });
  }
};
exports.createBooking = async (req, res) => {
  const bookingObj = {
    theaterId: req.body.theaterId,
    movieId: req.body.movieId,
    userId: req.body.userId,
    status: req.body.status,
    timings: req.body.timings,
    noOfSeats: req.body.noOfSeats,
    totalCost: req.body.noOfSeats * constans.bookingStatus.ticketPrice,
  };
  try {
    const bookingCreate = await Booking.create(bookingObj);
    return res.status(201).send(bookingCreate);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({
      message: "Creating a bokking is not possible  " + error.message,
    });
  }
};
exports.deleteBooking = async (req, res) => {
  const bookingid = await Booking.findOne({ _id: req.params.id });
  const deleteBooking = await Booking.deleteOne(bookingid);
  res.status(200).send(deleteBooking, {
    message: "The above Booking deleted successfully",
  });
};
