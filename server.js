const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();

const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan");
const session = require('express-session');
const passUserToView = require('./middleware/pass-user-to-view.js');
const authController = require('./controllers/auth.js');
const isSignedIn = require('./middleware/is-signed-in.js');
const foodController = require('./controllers/foods.js');
const allUsersController = require('./controllers/allUsers.js');

const port = process.env.PORT ? process.env.PORT : "3000";

const path = require('path');

/* ---------- DB connections ----------*/

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});


/* ---------- Middleware ----------*/

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: false }));

app.use(methodOverride("_method"));

app.use(morgan('dev'));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passUserToView);
app.use("/auth", authController);
app.use('/users/:usersId/foods', isSignedIn, foodController);
app.use('/allUsers', isSignedIn, allUsersController);

/* ---------- Routes ----------*/

 //GET_landing page
app.get("/", async (req, res) => {
  if (req.session.user) {
    res.redirect(`/users/${req.session.user._id}/foods`);
  } else {
    res.render("index.ejs");
  }
});


app.get("/new", async (req, res) => {
  res.render("new.ejs", { user: req.session.user, })
});

/* ---------- Port ----------*/

app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});
