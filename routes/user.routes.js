const express = require("express");
const router = express.Router();
const passport = require("passport");
const flash = require("connect-flash");
const mailer = require("../configs/nodemailer.config");
const template = require("../templates/template");

const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");
const multer = require("multer");

const User = require("../models/user.model")

const uploadCloud = require('../configs/cloudinary.config.js');

// User Profile

router.get('/profile', ensureLoggedIn(), (req, res) => res.render('user/profile', { message: req.flash('error') }));

// Update Profile
router.get('/profile/update', (req, res, next) => {
  const { username, email, address } = req.user
  res.render('user/update-account', { username, email, address })
})
router.post('/profile/update', ensureLoggedIn(), uploadCloud.single('photo'), (req, res, next) => {

  const { _id } = req.user
  const { username, email, address } = req.body
  const tempUsername = username || req.user.username;
  const tempAddress = address || req.user.address;
  const tempEmail = email || req.user.email;
  const tempURL = req.file ? req.file.url : req.user.photoURL;

  User.findByIdAndUpdate({ _id }, { username: tempUsername, email: tempEmail, photoURL: tempURL, address: tempAddress }, { new: true })
    .then(updateUser => res.redirect(`/profile`))
    .catch(err => next(err))
})

// My Comics

router.get("/mycomics", (req, res) => res.render("user/myComics"));

//POST
router.post("/user/characters", ensureLoggedIn(), (req, res, next) => {
  const { _id } = req.user;
  let { character_favorites } = req.body;
  let tempColletion = [...req.user.character_favorites, ...character_favorites];

  User.findByIdAndUpdate({ _id }, { character_favorites: tempColletion })
    .catch((err) => next(err));
});

router.post("/user/comics", ensureLoggedIn(), (req, res, next) => {
  const { _id } = req.user;
  let { comics_favorites } = req.body;
  let tempColletion = [...req.user.comics_favorites, ...comics_favorites];

  User.findByIdAndUpdate({ _id }, { comics_favorites: tempColletion })
    .catch((err) => next(err));
});

router.post("/user/series", ensureLoggedIn(), (req, res, next) => {
  const { _id } = req.user;
  let { series_favorites } = req.body;
  let tempColletion = [...req.user.series_favorites, ...series_favorites];

  User.findByIdAndUpdate({ _id }, { series_favorites: tempColletion })
    .catch((err) => next(err));
});

// Charts

router.get("/charts", (req, res) => res.render("user/charts"));

//Recommended ...

router.get("/smartlist", (req, res) => res.render("user/smartList"));

router.get("/user/favorites", (req, res) => res.send(req.user.character_favorites));

router.get("/user/status", (req, res) => {
  res.send(req.user.status)
});

module.exports = router
