const express = require("express");

const noteRoute = require("./routes/Note.js");

const app = express();
const PORT = 3000;

app.use("/notes", noteRoute);

app.listen(PORT, () => {
    console.log("Server UP!");
});
