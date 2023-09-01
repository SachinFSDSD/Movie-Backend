const mongoose = require("mongoose");

const paymentModule = new mongoose.Schema(
  {
    bookingId: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: "bookingSchema",
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
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
      immutable: true,
      default: () => {
        return Date.now();
      },
    },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("paymentModule", paymentModule);
