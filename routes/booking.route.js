const bookingController = require("../controller/bookingController");
const authJwt = require("../middleware/authJwt.verify");
const verifyBookingReqBody = require("../middleware/validateBookingRequest");
const validateBookingRequest = require("../middleware/validateBookingRequest");

module.exports = function (app) {
  app.get(
    "/movieBooking/api/v1/booking",
    [authJwt.verifyToken, authJwt.isAdmin],
    bookingController.getAllbookings
  );
  app.get(
    "/movieBooking/api/v1/booking/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    bookingController.getAllbookingsById
  );
  app.post(
    "/movieBooking/api/v1/booking",
    [authJwt.verifyToken, validateBookingRequest.validateBookingRequest],
    bookingController.createBooking
  );
  app.put(
    "/movieBooking/api/v1/booking",
    [
      authJwt.verifyToken,
      authJwt.isAdmin,
      verifyBookingReqBody.validateBookingRequest,
    ],
    bookingController.updateBooking
  );
  app.delete(
    "/movieBooking/api/v1/booking/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    bookingController.deleteBooking
  );
};
