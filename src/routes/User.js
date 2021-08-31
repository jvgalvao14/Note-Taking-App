const express = require("express");
const router = express.Router();
let User = require("../models/userModel");
const session = require("express-session");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const flash = require("express-flash");
const cookieParser = require("cookie-parser");

//Middlewares
router.use(cookieParser());
router.use(flash());
router.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
    })
);
router.use(express.urlencoded({ extended: true }));

//checks if the user is logged in
const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
};

//checks if the user is logged out
const isLoggedOut = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect("/");
};

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

//Routes

//Create a User
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

router.get("/", isLoggedIn, (req, res) => {
    res.cookie("id", req.user.id);
    res.render("index");
});

router.get("/login", isLoggedOut, (req, res) => {
    const response = {
        error: req.query.error,
    };
    res.render("login", { response });
});

router.post(
    "/user/auth",
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login?error=true",
    })
);

router.get("/logout", (req, res) => {
    req.logout();
    res.clearCookie("id");
    res.redirect("/");
});

router.get("/user/signup", (req, res) => {
    res.render("signup");
});

router.get("/user/forgot", (req, res) => {
    res.render("forgot");
});

router.post("/user/forgot", async (req, res) => {
    const hashedPass = await bcrypt.hash(req.body.password, 10);
    const email = req.body.email;

    try {
        User.findOneAndUpdate(
            { email: email },
            { password: hashedPass },
            () => {}
        );
    } catch (error) {
        return res.json(error);
    }
    return res.redirect("/login");
});

module.exports = router;
