// Passport simple login setup
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/usermodel");
const bcrypt = require("bcrypt");

module.exports = function (passport) {

    // login strategy
    passport.use(
        new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
            const user = await User.findOne({ email });
            if (!user) return done(null, false);

            const match = await bcrypt.compare(password, user.password);
            if (!match) return done(null, false);

            return done(null, user);
        })
    );

    // session store
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        const user = await User.findById(id);
        done(null, user);
    });
};
