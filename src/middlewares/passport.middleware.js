const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const { jwtSecret } = require("../../config");

const { findUserById } = require("../modules/users/users.services");

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtSecret,
};

passport.use(
    new JwtStrategy(options, async (tokenDecoded, done) => {
        try {
            const user = await findUserById(tokenDecoded.sub);
            if (user) return done(null, user);
            done(null, false);
        } catch (error) {
            done(error, false);
        }
    })
);

module.exports = passport;
