const mongoose = require("mongoose");

let connection = (uri) => {
    try {
        mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: true,
        });
        const connection = mongoose.connection;
        connection.once("open", () => {
            console.log("MongoDB database connected");
        });
    } catch (error) {}
};

module.exports = connection;
