const paymnetController = require("../controller/paymnetController.js");

const authJwt = require("../middleware/authJwt.verify.js");

module.exports = function (app) {
  app.get(
    "/movieBooking/api/v1/payments",
    [authJwt.verifyToken],
    paymnetController.getAllPaymnet
  );
  app.get(
    "/movieBooking/api/v1/payments/:id",
    [authJwt.verifyToken],
    paymnetController.getPaymentById
  );
  app.post(
    "/movieBooking/api/v1/payments",
    [authJwt.verifyToken],
    paymnetController.createPayment
  );
};
