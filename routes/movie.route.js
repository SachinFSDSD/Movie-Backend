const movieController = require("../controller/moviecontroller");
const verifyMovieReqBody = require("../middleware/verifymovie.middleware");

module.exports = function (app) {
  app.get("/movieBooking/api/v1/movies", movieController.getAllMovies);

  app.get("/movieBooking/api/v1/movies/:id", movieController.getMovieById);

  app.post(
    "/movieBooking/api/v1/movies",
    [verifyMovieReqBody.validateMovierequestBody],
    movieController.createMovie
  );
  app.put(
    "/movieBooking/api/v1/movies/:id",
    [verifyMovieReqBody.validateMovierequestBody],
    movieController.updateMovie
  );
  app.delete("/movieBooking/api/v1/movies/:id", movieController.deleteMovie);
};
