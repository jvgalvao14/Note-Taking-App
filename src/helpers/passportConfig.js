const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
let User = require("../models/userModel");

let initialize = (passport) => {
    const authUser = async (username, password, done) => {
        const user = User.findOne({ username: username }).exec();
        if (user === null && user === undefined) {
            return done(null, false, { message: "No such user" });
        }
        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user);
            } else {
                return done(null, false, { message: "Password incorrect" });
            }
        } catch (error) {
            return done(error);
        }
    };
    passport.use(new localStrategy({ usernameField: "username" }, authUser));
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });
    passport.deserializeUser((id, done) => {
        return done(null, User.findOne({ _id: id }).exec());
    });
};

module.exports = initialize;
