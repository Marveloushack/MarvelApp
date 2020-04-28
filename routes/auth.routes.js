const express = require("express")
const router = express.Router()
const passport = require("passport")
const flash = require("connect-flash")
const mailer = require('../configs/nodemailer.config')
const template = require("../templates/template")

const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const multer = require('multer');

const User = require("../models/user.model")

const bcrypt = require("bcrypt")
const bcryptSalt = 10

const uploadCloud = require('../configs/cloudinary.config.js');


// User signup

router.get('/signup', ensureLoggedOut(), (req, res) => {
    res.render('auth/signup', { message: req.flash('error') });
});

//let upload = multer({ dest: './public/uploads/' });
router.post("/signup",

    uploadCloud.single('photo'),
    ensureLoggedOut(),

    (req, res, next) => {

        const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let token = '';
        for (let i = 0; i < 25; i++) {
            token += characters[Math.floor(Math.random() * characters.length)];
        }

        const { username, password, email } = req.body
        const filename = req.file.url
        let confirmationCode = token

// location
        
        let location = {
            type: 'Point',
            coordinates: [req.body.longitude, req.body.latitude]
        }

        if (!username || !password) {
            res.render("auth/signup", { errorMsg: "Please enter you username and password" })
            return
        }
        User.findOne({ username })
            .then(user => {
                if (user) {
                    res.render("auth/signup", { errorMsg: "It looks like that email has already been used to create an account here. If this is your email address, just sign in to your account." })
                    return
                }
                const salt = bcrypt.genSaltSync(bcryptSalt)
                const hashPass = bcrypt.hashSync(password, salt)

                return User.create({
                    photoURL: filename,
                    username,
                    email,
                    password: hashPass,
                    confirmationCode,
                    location
                })

                    .then(() => {
                        let message = 'test message'
                        mailer.sendMail({
                            from: '<testfordev2@gmail.com>',
                            to: email,
                            subject: 'Confirmation Email',
                            text: message,
                            html: template.template(confirmationCode)
                        })
                        res.redirect("/profile")
                    })
                    .catch((err) => {
                        console.log(err)
                        res.render("auth/signup", { errorMsg: "User can not be create" })
                    })
            })
            .catch(err => next(err))
    })


router.get('/auth/confirm/:confirmCode', (req, res, next) => {

    User.findOneAndUpdate({ confirmationCode: req.params.confirmCode },
        { status: 'Active' }, { new: true })
        .then(updateStatus => res.render('user/confirmation', { updateStatus }))
        .catch(err => next(err))

})

// User login
router.get('/login', ensureLoggedOut(), (req, res) => res.render('auth/login', { "errorMsg": req.flash("error") }))

router.post('/login', ensureLoggedOut(), passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
    passReqToCallback: true,
    badRequestMessage: 'Please fill the required fields'
}))


// User logout
router.get("/logout", ensureLoggedIn(), (req, res) => {
    req.logout()
    res.redirect("/")
})

module.exports = router