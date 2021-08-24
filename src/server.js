const express = require("express");
const path = require("path");
const connection = require("./connection/Connection");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
require("./connection/Connection");

//calling my routes file
const noteRoute = require("./routes/Note.js");

const app = express();

//setting up my Template engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use("/notes", noteRoute);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

connection(process.env.URI);

app.listen(process.env.PORT, () => {
    console.log("Server UP!");
});
