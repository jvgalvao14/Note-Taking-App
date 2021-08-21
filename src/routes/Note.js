const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
let Note = require("../models/noteModel");

router.get;

//Returns the whole "Note" collection.
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

//Returns especific "Note" with the ID passed through headers.
router.get("/find", (req, res) => {
    let id = req.headers.id;
    async function findNote() {
        const doc = await Note.findOne({ id: id }).exec();
        return res.json(doc);
    }
    findNote();
});

//Creates a "Note" and saves it to the DB Collection.
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

//deletes a Note.
router.delete("/", (req, res) => {
    const noteId = req.headers.id;
    async function deleteNote() {
        try {
            await Note.deleteOne({ id: noteId }).exec();
            return res.status(201).json("Note deleted");
        } catch (error) {
            return res.status(400).json(error);
        }
    }
    deleteNote();
});

module.exports = router;
