const express = require("express");
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");
const User = require("../models/user.model");

router.get("/", (req, res) => res.render("index"));

router.get("/librariesmap", ensureLoggedIn(), (req, res) => res.render("librariesmap"));
router.get("/socialmap", (req, res) => res.render("socialmap"));

router.get("/social", (req, res) => {
  User.find()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => console.log("Error con el mapa social", err));
});


module.exports = router;

//
