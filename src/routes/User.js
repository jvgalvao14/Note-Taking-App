const express = require("express");
const router = express.Router();
let User = require("../models/userModel");
const session = require("express-session");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

//Middlewares
router.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
    })
);
router.use(express.urlencoded({ extended: true }));

//Passport.js
router.use(passport.initialize());
router.use(passport.session());

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

passport.use(
    new localStrategy((username, password, done) => {
        User.findOne({ username: username }, (err, user) => {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, { message: "User does not exist" });
            }
            bcrypt.compare(password, user.password, (err, res) => {
                if (err) {
                    return done(err);
                }
                if (res === false) {
                    return done(null, false, { message: "Incorrect password" });
                }

                return done(null, user);
            });
        });
    })
);

router.post("/user/create", async (req, res) => {
    try {
        const hashedPass = await bcrypt.hash(req.body.password, 10);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass,
        });

        await newUser.save();
        return res.status(201).redirect("/login");
    } catch (error) {
        res.status(400).json("Error" + error);
    }
});

const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
};

const isLoggedOut = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect("/");
};

router.get("/", isLoggedIn, (req, res) => {
    res.render("index");
});

router.get("/login", isLoggedOut, (req, res) => {
    res.render("login");
});

router.post(
    "/user/auth",
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login?error=true",
    })
);

router.get("/login", (req, res) => {
    res.render("login");
});

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});

router.get("/user/signup", (req, res) => {
    res.render("signup");
});

router.get("/user/forgot", (req, res) => {
    res.render("forgot");
});

module.exports = router;
