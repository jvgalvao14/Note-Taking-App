const express = require("express");
const router = express.Router();
let User = require("../models/userModel");
const passport = require("passport");
const session = require("express-session");
const flash = require("express-flash");

const bcrypt = require("bcryptjs");

const initializePassport = require("../helpers/passportConfig");
initializePassport(passport);

const urlencodedParser = express.urlencoded({ extended: true });

router.use(flash());
router.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    })
);
router.use(passport.initialize());
router.use(passport.session());

router.post("/create", urlencodedParser, async (req, res) => {
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

router.post(
    "/auth",
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login",
        failureFlash: true,
    })
);

router.get("/signup", (req, res) => {
    res.render("signup");
});

router.get("/forgot", (req, res) => {
    res.render("forgot");
});

module.exports = router;
