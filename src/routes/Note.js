const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
let Note = require("../models/noteModel");

router.get;

router.get("/", (req, res) => {
    Note.find()
        .then((notes) => res.json(notes))
        .catch((err) => res.status(400).json("Error" + err));
});

router.get("/find", (req, res) => {
    let id = req.headers.id;
    async function auth() {
        const doc = await Note.findOne({ id: id }).exec();
        return res.json(doc);
    }
    auth();
});

router.post("/", (req, res) => {
    const title = req.headers.title;
    const body = req.headers.body;
    const id = uuidv4();

    const newNote = new Note({
        title,
        body,
        id,
    });

    newNote
        .save()
        .then(() => {
            res.status(201).json("Note taken!");
        })
        .catch((err) => res.status(400).json("Error" + err));
});

module.exports = router;
