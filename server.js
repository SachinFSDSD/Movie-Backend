const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const DB_CONFIG = require("./config/server.congif");
const DBconfig = require("./config/dbconfig");
const User = require("./module/userModule");
const bcrypt = require("bcryptjs");

const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

mongoose.connect(DBconfig.DB_URL);
const db = mongoose.connection;
db.on("error", () => {
  console.log("Not connected to db");
});
db.once("open", () => {
  console.log("Conncted to db");
  init();
});

async function init() {
  await User.collection.drop();
  var user = await User.findOne({ userId: "admin" });

  if (user) {
    console.log("Admin id already present");
    return;
  }
  try {
    user = await User.create({
      name: "sachin",
      userId: "ADMIN",
      password: bcrypt.hashSync("admin", 8),
      email: "admin12@gmail.com",
      userType: "ADMIN",
      userStatus: "APPROVED",
    });
    console.log(user);
  } catch (error) {
    console.log("Unable to add admin " + error.message);
  }
}
require("./routes/booking.route")(app);
require("./routes/movie.route")(app);
require("./routes/authRoute")(app);
require("./routes/theatrer.route")(app);
require("./routes/userRoute")(app);
require("./routes/payment.routes")(app);

app.listen(DB_CONFIG.PORT, () => {
  console.log(`Server started at ${DB_CONFIG.PORT}`);
});
