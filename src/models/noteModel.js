const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const noteSchema = new Schema(
    {
        note: {
            title: String,
            body: String,
            date: Date,
            id: String,
        },
    },
    { timestamps: true }
);

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
