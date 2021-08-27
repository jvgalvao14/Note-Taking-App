const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

router.get("/", (req, res) => {
    res.render("login", { message: null });
});

module.exports = router;
