const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    required: true,
    default: "CUSTOMER",
  },
  userStatus: {
    type: String,
    required: true,
    default: "APPROVED",
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
});

module.exports = mongoose.model("user", userSchema);
