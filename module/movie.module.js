const mongoose = require("mongoose");

const moviesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  cast: {
    type: [String],
    required: true,
  },
  postUrl: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  releaseDate: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  releaseStatus: {
    type: String,
    required: true,
    default: "RELEASED",
  },
  updatedAt: {
    type: Date,
    default: () => {
      return Date.now();
    },
  },
  updatedAt: {
    type: Date,
    default: () => {
      return Date.now();
    },
  },
});

module.exports = mongoose.model("movies", moviesSchema);
