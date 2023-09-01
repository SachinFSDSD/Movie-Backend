const mongoose = require("mongoose");

const theater = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    pincode: {
      type: Number,
      required: true,
    },
    movies: {
      type: [mongoose.SchemaTypes.ObjectId],
      ref: "movies",
    },
    createdAt: {
      type: Date,
      immutable: true,
      default: () => {
        return Date.now();
      },
    },
    updatedAt: {
      type: Date,
      immutable: true,
      default: () => {
        return Date.now();
      },
    },
    ownerId: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: "user",
    },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("theater", theater);
