const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
let Note = require("../models/noteModel");

router.get;

router.get("/", (req, res) => {
    async function findNote() {
        try {
            let notes = await Note.find();
            return res.status(201).json(notes);
        } catch (error) {
            return res.status(400).json("Error" + error);
        }
    }

    findNote();
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

    async function createNewNote() {
        const newNote = new Note({
            title,
            body,
            id,
        });

        try {
            await newNote.save();
            return res.status(201).json("Note taken!");
        } catch (error) {
            res.status(400).json("Error" + error);
        }
    }
    createNewNote();
});

module.exports = router;
