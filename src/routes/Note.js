const express = require("express");
const router = express.Router();
let Note = require("../models/noteModel");

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

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

//Returns especific "Note" with the ID passed through params.
router.get("/:id", (req, res) => {
    let id = req.params.id;
    async function findNote() {
        try {
            const doc = await Note.findOne({ _id: id });
            return res.json(doc);
        } catch (error) {
            return res.status(404).json(error);
        }
    }
    findNote();
});

//Creates a "Note" and saves it to the DB Collection.
router.post("/", (req, res) => {
    const title = req.body.title;
    const body = req.body.body;

    async function createNewNote() {
        const newNote = new Note({
            title,
            body,
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
router.delete("/:id", (req, res) => {
    const noteId = req.params.id;
    async function deleteNote() {
        try {
            await Note.findByIdAndRemove({ _id: noteId });
            return res.status(201).json("Note deleted!");
        } catch (error) {
            return res.status(400).json(error);
        }
    }
    deleteNote();
});

//Updates a Note
router.get("/update/:id", (req, res) => {
    const title = req.body.title;
    const body = req.body.body;

    const update = {
        title: title,
        body: body,
    };
    const id = req.params.id;
    async function updateNote() {
        try {
            Note.findOneAndUpdate(
                { _id: id },
                update,
                { new: true },
                (note) => {
                    return res.status(201).json("Deu certo!");
                }
            );
        } catch (error) {
            return res.json("Deu errado :( " + error);
        }
    }
    updateNote();
});

module.exports = router;
