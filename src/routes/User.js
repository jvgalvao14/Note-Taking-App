const express = require("express");
const router = express.Router();
let User = require("../models/userModel");

const bcrypt = require("bcryptjs");

const urlencodedParser = express.urlencoded({ extended: true });

router.post("/create", urlencodedParser, async (req, res) => {
    try {
        const salt = await bcrypt.genSalt();
        const hashedPass = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass,
        });

        await newUser.save();
        return res.status(201).json("Note taken!");
    } catch (error) {
        res.status(400).json("Error" + error);
    }
});

router.get("/signup", (req, res) => {
    res.render("signup");
});

router.get("/forgot", (req, res) => {
    res.render("forgot");
});

module.exports = router;
