const express = require("express");
const path = require("path");
const connection = require("./connection/Connection");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
require("./connection/Connection");

//calling my routes files
const noteRoute = require("./routes/Note.js");
const appRoute = require("./routes/App.js");
const loginRoute = require("./routes/Login.js");
const userRoute = require("./routes/User.js");

const app = express();

//setting up my Template engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/", appRoute);
app.use("/login", loginRoute);
app.use("/user", userRoute);
app.use("/notes", noteRoute);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

connection(process.env.URI);

app.listen(process.env.PORT, () => {
    console.log("Server UP!");
});
