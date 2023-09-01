const mongoose = require("mongoose");
const constans = require("../utils/constans");

const bookingSchema = new mongoose.Schema({
  theaterId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "theater",
  },
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "movies",
  },
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "user",
  },
  status: {
    type: String,
    required: true,
  },
  timings: {
    type: String,
    required: true,
  },
  createdAt: {
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
  noOfSeats: {
    type: String,
    required: true,
  },
  totalCost: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("bookingSchema", bookingSchema);
