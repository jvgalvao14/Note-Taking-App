const express = require("express");
const router = express.Router();
let User = require("../models/userModel");

const urlencodedParser = express.urlencoded({ extended: true });

router.post("/create", urlencodedParser, (req, res) => {
    res.send("boa");
});

router.get("/signup", (req, res) => {
    res.render("signup");
});

router.get("/forgot", (req, res) => {
    res.render("forgot");
});

module.exports = router;
