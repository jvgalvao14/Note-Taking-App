const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

const notes = [];

router.get;

router.get("/", (req, res) => {
    res.json(notes);
});

router.post("/", (req, res) => {
    let title = req.headers.title;
    let content = req.headers.content;
    let id = uuidv4();

    notes.push({ id, title, content });

    res.status(201).json("Note created!");
});

module.exports = router;
