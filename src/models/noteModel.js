const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const noteSchema = new Schema(
    {
        title: String,
        body: String,
        noteId: String,
    },
    {
        timestamps: true,
    }
);

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
