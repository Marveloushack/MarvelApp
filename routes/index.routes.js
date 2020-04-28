const express = require('express')
const router = express.Router()
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");


router.get('/', (req, res) => res.render('index'))

router.get("/librariesMap", ensureLoggedIn(), (req, res) => res.render("librariesMap"));

module.exports = router