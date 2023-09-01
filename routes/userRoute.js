const userController = require("../controller/userController");
const authJwt = require("../middleware/authJwt.verify");

module.exports = function (app) {
  app.put(
    "/movieBooking/api/v1/user/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    userController.updateUser
  );
  app.get(
    "/movieBooking/api/v1/user",
    [authJwt.verifyToken, authJwt.isAdmin],
    userController.getAllUser
  );
  app.get(
    "/movieBooking/api/v1/user/:id",
    [authJwt.verifyToken],
    userController.getuserById
  );
  app.delete(
    "/movieBooking/api/v1/user/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    userController.deleteUser
  );
};
