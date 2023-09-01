const authController = require("../controller/authController");
const userAutheticate = require("../middleware/userVerifyMiddleware");

module.exports = function (app) {
  app.post(
    "/movieBooking/api/v1/user/signUp",
    [userAutheticate.validateUserRequest],
    authController.signUp
  );

  app.post("/movieBooking/api/v1/user/signIn", authController.signIn);
};
