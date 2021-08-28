const express = require("express");
const router = express.Router();
let User = require("../models/userModel");

const urlencodedParser = express.urlencoded({ extended: true });

router.post("/user/create", urlencodedParser, async (req, res) => {
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

router.get("/", (req, res) => {
    res.render("index");
});

router.get("/login", (req, res) => {
    res.render("login");
});

router.post("/user/auth", (req, res) => {
    res.send("bro");
});

router.get("/login", (req, res) => {
    res.render("login");
});

router.get("/user/signup", (req, res) => {
    res.render("signup");
});

router.get("/user/forgot", (req, res) => {
    res.render("forgot");
});

module.exports = router;
