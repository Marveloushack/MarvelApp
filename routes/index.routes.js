const express = require("express");
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");
const User = require("../models/user.model");

router.get("/", (req, res) => res.render("index"));

router.get("/librariesmap", ensureLoggedIn(), (req, res) => res.render("librariesmap"));
router.get("/socialmap", (req, res) => res.render("socialmap"));

router.get("/social", (req, res,next) => {
  User.find()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => next(err));
});


module.exports = router;

//
