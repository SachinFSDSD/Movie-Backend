const paymentModule = require("../module/payment.module");
const Users = require("../module/userModule");
const Constants = require("../utils/constans");
const bookingSchema = require("../module/booking.module");
const sendEmail = require("../utils/NotificationClient");

exports.getAllPaymnet = async (req, res) => {
  const queryObj = {};
  const user = await Users.findOne({ userId: req.userId });

  if (user.userType !== Constants.userType.admin) {
    const bookings = await bookingSchema.find({ userId: user._id });
    const bookingsId = bookings.map((booking) => booking._id);
    queryObj.bookingsId = { $in: bookingsId };
  }

  try {
    const payment = await paymentModule.find(queryObj);
    res.status(200).send(payment);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server error");
  }
};

exports.getPaymentById = async (req, res) => {
  try {
    const paymnets = await paymnets.findOne({ _id: req.params.id });
    res.status(200).send(paymnets);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      message: "Internal error while searching for the paymnet",
    });
  }
};

exports.createPayment = async (req, res) => {
  const booking = await bookingSchema.findOne({ _id: req.body.bookingId });

  const bookingTime = Date.now();
  var currentTime = Date.now();
  var min = Math.floor((currentTime - bookingTime) / (1000 * 60));

  if (min > 5) {
    booking.status = Constants.paymnetStatus.expired;
    await booking.save();
    return res.status(200).send({
      message: "Can't do the paymnet as the booking has expired",
    });
  }

  var paymnetObj = {
    bookingId: req.body.bookingId,
    amount: req.body.amount,
    status: Constants.bookingStatus.completed,
  };

  try {
    const paymnet = await paymentModule.create(paymnetObj);
    booking.status = Constants.paymnetStatus.success;
    await booking.save();

    const user = await Users.findOne({ userId: req.userId });
    sendEmail(
      paymnet._id,
      "Payment successfull for the booking id: " + paymnet.bookingId,
      JSON.stringify(booking),
      user.email,
      "mba-no-reply@gmail.com"
    );
    return res.status(201).send(paymnet);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      message:
        "Internal server error while creating the booking " + error.message,
    });
  }
};
