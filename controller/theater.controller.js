const theater1 = require("../module/theater.module");
const movie = require("../module/movie.module");
const userTypes1 = require("../utils/constans").userType;
const User = require("../module/userModule");
const theaterModule = require("../module/theater.module");
const { sendMail } = require("../utils/NotificationClient");

exports.getAllTheater = async (req, res) => {
  const queryObject = {};
  if (req.query.name != undefined) {
    queryObject.name = req.query.name;
  }
  if (req.query.city != undefined) {
    queryObject.city = req.query.city;
  }
  if (req.query.pincode != undefined) {
    queryObject.pincode = req.query.pincode;
  }
  try {
    var theater = await theater1.find(queryObject);

    if (req.query.movieId != undefined) {
      theater = theater.filter((t) => t.movies.includes(req.query.movieId));
    }
    return res.status(200).send(theater);
  } catch (error) {
    return res.status(500).send({
      message: "Inter error occured while getting all the theater",
    });
  }
};

exports.getTheaterById = async (req, res) => {
  const thesterId = {
    _id: req.params._id,
  };
  try {
    const theti = await theater1.findOne(thesterId);
    return res.status(200).send(theti);
  } catch (error) {
    return res.status(500).send({
      message:
        "Internal error occured while fetching data using theater id" +
        error.message,
    });
  }
};

exports.createTheater = async (req, res) => {
  const theraterObject = {
    name: req.body.name,
    description: req.body.description,
    city: req.body.city,
    pincode: req.body.pincode,
    movies: req.body.movies,
  };

  const userType = await User.findOne({ userType: userTypes1.admin });
  const client = await User.findOne({});
  try {
    if (!theraterObject) {
      res.status(400).send({
        message: "Please fill all the details",
      });
    } else if (theraterObject) {
      const thetrer = await theater1.create(theraterObject);
      res.status(200).send({
        message: "A theater is added successdully.. " + theraterObject,
      });
      sendMail(
        thetrer._id,
        "New theater created with the thetaer: " + thetrer._id,
        JSON.stringify(theraterObject),
        [userType.email, client.email],
        "mba-no-reply@mba.com"
      );
    }
  } catch (error) {
    return res.status(500).send({
      message: "Some internal error ocuucred" + error.message,
    });
  }
};

exports.updateTheater = async (req, res) => {
  var savedTheatre = await theater1.findOne({ _id: req.params.id });

  if (!savedTheatre) {
    return res.status(400).send({
      message: "The theatre you want to update doesn't exist!",
    });
  }

  savedTheatre.name =
    req.body.name != undefined ? req.body.name : savedTheatre.name;
  savedTheatre.description =
    req.body.description != undefined
      ? req.body.description
      : savedTheatre.description;
  savedTheatre.city =
    req.body.city != undefined ? req.body.city : savedTheatre.city;
  savedTheatre.pincode =
    req.body.pinCode != undefined ? req.body.pinCode : savedTheatre.pincode;

  var updatedTheatre = await savedTheatre.save();

  return res.status(200).send(updatedTheatre);
};

exports.deletetheater = async (req, res) => {
  await theater1.deleteOne({
    _id: req.params._id,
  });
  try {
    return res.status(200).send({
      message: "Succesfully deleted the above theater" + id,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Unable to delete the folloeing id " + error.message,
    });
  }
};

exports.addmovieTotheater = async (req, res) => {
  const movieId = [];
  var validmovies = [];
  try {
    const savedTheater = await theater1.findOne({ _id: req.params.id });
    if (!savedTheater) {
      return res.status(400).send({
        message: "The theater wher you want to add the movies doesnot exit",
      });
    }

    validmovies = await validmovies.find(req.body.movieId);

    if (validmovies.length > 0) {
      savedTheater.movies = validmovies;
      const updateTheater = await savedTheater.save();
      return res.status(200).send(updateTheater);
    } else {
      return res.status(200).send({
        message: "No valid ",
      });
    }
  } catch (err) {
    return res.status(400).send({
      message: "Some error ocuured" + err.message,
    });
  }
};
exports.getValidaMovies = async (movieId) => {
  var validmovies = [];
  if (movieId != null && movieId.length > 0) {
    for (let i = 0; i < movieId.length; i++) {
      const savedMovies = await movie.findOne({ _id: movieId[i] });
      if (savedMovies) {
        validmovies.push(movieId[i]);
      }
    }
  }

  return validmovies;
};

exports.checkMovieIntheater = async (req, res) => {
  const savedTheater = await theater1.findOne({ _id: req.params.thesterId });

  if (!savedTheater) {
    return res.status(400).send({
      message: "Theater where you want to check the movie for doesnot exist",
    });
  }

  const savedMovies = await movie.findOne({ _id: req.paramas.thesterId });

  if (!savedMovies) {
    return res.status(400).send({
      message: "The movie you are looking for check is doesnot exit",
    });
  }

  return res.status(200).send({
    message: savedTheater.movies.includes({ _id: req.params.movieId })
      ? "Movie is present"
      : "Movie is not present",
  });
};

exports.removeMoviesFromATheater = async (req, res) => {
  await theater1.deleteOne({
    _id: req.body._id,
  });

  return res.status(200).send({
    message: "Successfully deleted the movie requested",
  });
};
