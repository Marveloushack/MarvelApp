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


// Update Profile
router.get('/profile/update', (req, res, next) => {
    const { username, email, password } = req.user
    res.render('user/update-account', { username, email, password })
})
router.post('/profile/update', ensureLoggedIn(), uploadCloud.single('photo'), (req, res, next) => {

    const { _id } = req.user
    const { username, email } = req.body
    console.log('BODY', req.file)


    const tempUsername = username || req.user.username;
    const tempEmail = email || req.user.email;
    const tempURL = req.file ? req.file.url : req.user.photoURL;

    User.findByIdAndUpdate({ _id }, { username: tempUsername, email: tempEmail, photoURL: tempURL }, { new: true })
        .then(updateUser => {
            console.log(updateUser)
            res.redirect(`/profile`)
        })
        .catch(err => next(err))
})

module.exports = router