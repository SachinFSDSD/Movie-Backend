const constant = require("../utils/constans");

validateMovierequestBody = async (req, res, next) => {
  if (!req.body.name) {
    return res.status(400).send({
      message: "Failed! Movie name is not provided.",
    });
  }

  //Validate if releaseStatus is provided - return HTTP 400
  if (!req.body.releaseStatus) {
    return res.status(400).send({
      message: "Failed! Movie release status is not provided.",
    });
  }

  //Validate the releaseStatus of the movie: "RELEASED", "BLOCKED", "UNRELEASED" - return HTTP 400
  const releaseStatus = req.body.releaseStatus;
  const releaseStatusTypes = [
    constant.releaseStatus.unreleased,
    constant.releaseStatus.released,
    constant.releaseStatus.blocked,
  ];
  if (!releaseStatusTypes.includes(releaseStatus)) {
    return res.status(400).send({
      message:
        "Failed! Movie release status provided is invalid. Valid values are UNRELEASED | RELEASED | BLOCKED.",
    });
  }

  //Validate if the releaseDate is provied - return HTTP 400
  if (!req.body.releaseDate) {
    return res.status(400).send({
      message: "Failed! Movie release date is not provided.",
    });
  }

  //Validate if the director is provided - return HTTP 400
  if (!req.body.director) {
    return res.status(400).send({
      message: "Failed! Movie director is not provided.",
    });
  }

  next();
};

// validate if the movie name is provided
// Vlaidate the release status
//
const verifyMovieReqBody = {
  validateMovierequestBody: validateMovierequestBody,
};

module.exports = verifyMovieReqBody;
