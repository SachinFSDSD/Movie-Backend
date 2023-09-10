const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const DB_CONFIG = require("./config/server.congif");
const DBconfig = require("./config/dbconfig");
const Users = require("./module/userModule");
const bcrypt = require("bcryptjs");
const Movies = require("./module/movie.module");
const Theatre = require("./module/theater.module");
const Bookings = require("./module/booking.module");
const cors = require("cors");

const app = express();
app.use(cors());
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
  await Users.collection.drop();
  const user1 = await Users.create({
    name: "sachin",
    userId: "admin",
    email: "rajusachin0900@gmail.com",
    userType: "ADMIN",
    password: bcrypt.hashSync("admin", 8),
  });
  console.log(user1);

  await Movies.collection.drop();
  const movie1 = await Movies.create({
    name: "Radhe Shyam",
    description: "Comedy Drama Movie",
    casts: ["Prabhas", "Pooja Hegde"],
    director: "Radha Krishna Kumar",
    trailerUrl: "http://RadhaShyam/trailers/1",
    postUrl:
      "https://c0.wallpaperflare.com/preview/994/724/862/balance-bboy-cool-dance.jpg",
    language: "Hindi",
    releaseDate: "11-02-2022",
    releaseStatus: "RELEASED",
  });
  const movie2 = await Movies.create({
    name: "Radhe Shyam 2",
    description: "Comedy Drama Movie",
    casts: ["Prabhas", "Pooja Hegde"],
    director: "Radha Krishna Kumar",
    trailerUrl: "http://RadhaShyam/trailers/1",
    postUrl:
      "https://c0.wallpaperflare.com/preview/994/724/862/balance-bboy-cool-dance.jpg",
    language: "Hindi",
    releaseDate: "11-02-2022",
    releaseStatus: "RELEASED",
  });
  const movie3 = await Movies.create({
    name: "Radhe Shyam 3",
    description: "Comedy Drama Movie",
    casts: ["Prabhas", "Pooja Hegde"],
    director: "Radha Krishna Kumar",
    trailerUrl: "http://RadhaShyam/trailers/1",
    postUrl:
      "https://c0.wallpaperflare.com/preview/994/724/862/balance-bboy-cool-dance.jpg",
    language: "Hindi",
    releaseDate: "11-02-2022",
    releaseStatus: "RELEASED",
  });
  console.log("Admin  created successfully");

  const customer = await Users.create({
    name: "customer",
    userId: "customer",
    email: "raju@gmail.com",
    userType: "CUSTOMER",
    password: bcrypt.hashSync("123", 8),
  });
  const client = await Users.create({
    name: "Client1",
    userId: "client",
    email: "rajusachin090@gmail.com",
    userType: "CLIENT",
    password: bcrypt.hashSync("Welcome", 8),
  });
  await Theatre.collection.drop();
  const theatre = await Theatre.create({
    name: "FunCinema",
    city: "Bangalore",
    description: "Top class Theatre",
    pincode: 560052,
    movies: [movie1._id],
    ownerId: client._id,
  });
  console.log("A movie and a theatre created successfully");
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
