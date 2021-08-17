const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
let Note = require("../models/noteModel");

router.get;

router.get("/", (req, res) => {});

router.post("/", (req, res) => {
    new Note({
        title: req.headers.title,
        body: req.headers.body,
        date: new Date(),
        id: uuidv4(),
    });
    res.status(201).json("Note created!");
});

module.exports = router;
