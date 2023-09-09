const theaterController = require("../controller/theater.controller");

const verifytheaterReqBody = require("../middleware/verifyTheater.middleware");
const authjwt = require("../middleware/authJwt.verify");

module.exports = function (app) {
  app.get(
    "/movieBooking/api/v1/theater",

    theaterController.getAllTheater
  );
  app.get(
    "/movieBooking/api/v1/theater/:id",
    [authjwt.isAdminorClient],
    theaterController.getTheaterById
  );
  app.post(
    "/movieBooking/api/v1/theater",
    [authjwt.verifyToken],
    [verifytheaterReqBody.validateTheaterRequestBody],
    theaterController.createTheater
  );
  app.put(
    "/movieBooking/api/v1/theater/:id",
    [authjwt.verifyToken],
    theaterController.updateTheater
  );

  app.delete(
    "/movieBooking/api/v1/theater/:id",
    [authjwt.verifyToken],
    theaterController.deletetheater
  );

  app.put(
    "/movieBooking/api/v1/theater/:id/movies",
    [authjwt.isAdminorClient],
    theaterController.addmovieTotheater
  );

  app.get(
    "/movieBooking/api/v1/theater/:movieId",
    [authjwt.verifyToken],
    theaterController.checkMovieIntheater
  );

  app.delete(
    "/movieBooking/api/v1/theater/movies/:movieId",
    [authjwt.verifyToken],
    theaterController.removeMoviesFromATheater
  );
};
