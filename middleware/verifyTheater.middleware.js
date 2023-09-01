validateTheaterRequestBody = (req, res, next) => {
  if (!req.body.name) {
    return res.status(500).send({
      message: "Failed ! name is not given",
    });
  }

  if (!req.body.description) {
    return res.status(500).send({
      message: "Failed ! Description is not given",
    });
  }
  if (!req.body.city) {
    return res.status(500).send({
      message: "Failed ! Cityname is not given",
    });
  }
  if (!req.body.pincode) {
    return res.status(500).send({
      message: "Failed ! pincode is not given",
    });
  }

  if (!req.body.movies) {
    return res.status(500).send({
      message: "Failed ! movies is not given",
    });
  }

  next();
};

const verifyTheaterBody = {
  validateTheaterRequestBody: validateTheaterRequestBody,
};

module.exports = verifyTheaterBody;
