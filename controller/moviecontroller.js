const Movies = require("../module/movie.module");
const convertMovie = require("../utils/convertMovieObjet");

exports.getAllMovies = async (req, res) => {
  try {
    let movies = await Movies.find();
    if (movies) {
      return res.status(200).send(convertMovie.movieResponse(movies));
    }
  } catch (err) {
    return res.status(500).send({
      message: "some internal error ocuucred",
    });
  }
};

exports.getMovieById = async (req, res) => {
  const movieIdrequest = {
    _id: req.params.id,
  };
  const movi = await Movies.findOne(movieIdrequest);
  try {
    if (!movi) {
      res.send("Please enter valid movieId for seacrh a movie").status(201);
      return;
    } else if (movi) {
      return res.send(movi).status(200);
    }
  } catch (error) {
    res
      .send(
        "some error occured while fetching data from DB... " + error.message
      )
      .status(400);
  }
};

exports.createMovie = async (req, res) => {
  const movieObject = {
    name: req.body.name,
    description: req.body.description,
    cast: req.body.cast,
    director: req.body.director,
    posterUrl: req.body.postUrl,
    language: req.body.language,
    releaseDate: req.body.releaseDate,
    releaseStatus: req.body.releastate,
  };

  try {
    if (!movieObject) {
      res.send("Please fill all the details to add a movie in DB...");
    } else if (movieObject) {
      const movie = await Movies.create(movieObject);
      return res.status(200).send(movie);
    }
  } catch (error) {
    return res.status(500).send({
      message: "Some error ocuucred while creating " + error.message,
    });
  }
};

exports.updateMovie = async (req, res) => {
  const movieIdreq = null;
  try {
    movieIdreq = await Movies.findOne({ _id: req.params.id });
    if (!movieIdreq) {
      return res.status(400).send({
        message: "The movie with id is doesnot exist in our database",
      });
    }
  } catch (error) {
    return res.status(500).send({
      message: "Something went wrowng " + error.message,
    });
  }

  movieIdreq.name =
    req.body.name != undefined ? req.body.name : movieIdreq.name;
  movieIdreq.description =
    req.body.description != undefined
      ? req.body.description
      : movieIdreq.description;
  movieIdreq.cast =
    req.body.cast != undefined ? req.body.cast : movieIdreq.cast;

  movieIdreq.director =
    req.body.director != undefined ? req.body.director : movieIdreq.director;

  movieIdreq.posterUrl =
    req.body.posterUrl != undefined ? req.body.posterUrl : movieIdreq.posterUrl;
  movieIdreq.language =
    req.body.language != undefined ? req.body.language : movieIdreq.language;
  movieIdreq.releaseDate =
    req.body.releaseDate != undefined
      ? req.body.language
      : movieIdreq.releaseDate;
  movieIdreq.releaseStatus =
    req.body.releaseStatus != undefined
      ? req.body.releaseStatus
      : movieIdreq.releaseStatus;

  const updatedmovie = await movieIdreq.save();
  res.status(200).send(updatedmovie);
};
exports.deleteMovie = async (req, res) => {
  await Movies.deleteOne({
    _id: req.body._id,
  });

  return res.status(200).send({
    message:
      "Successfully the movie is deleted with the given Id " + req.body._id,
  });
};
