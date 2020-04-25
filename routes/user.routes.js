const express = require("express")
const router = express.Router()
const passport = require("passport")
const flash = require("connect-flash")
const mailer = require('../configs/nodemailer.config')
const template = require("../templates/template")

const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const multer = require('multer');

const User = require("../models/user.model")

const uploadCloud = require('../configs/cloudinary.config.js');


// User Profile

router.get('/profile', ensureLoggedIn('/login'), (req, res) => {
    res.render('user/profile', { message: req.flash('error') });
});


module.exports = router