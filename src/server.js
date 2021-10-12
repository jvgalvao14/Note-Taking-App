const express = require("express");
const path = require("path");
const connection = require("./connection/Connection");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
require("./connection/Connection");

//calling my routes files
const noteRoute = require("./routes/Note.js");
const userRoute = require("./routes/User.js");

const app = express();

const PORT = process.env.PORT || 3000;

//setting up my Template engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/", userRoute);
app.use("/notes", noteRoute);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

connection(process.env.URI);

app.listen(PORT, () => {
    console.log("Server UP!");
});
