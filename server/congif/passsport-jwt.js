const passport = require("passport");
const JWTStragey = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

const User = require("../models/user_model");

let opts = {
	jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
	secretOrKey: "secret",
};

passport.use(
	new JWTStragey(opts, function (jwtPayload, done) {
		User.findById(jwtPayload._id, function (err, user) {
			if (err) {
				console.log("error in finding user in jwt");
			}
			if (user) {
				return done(null, user);
			} else {
				return done(null, false);
			}
		});
	})
);

module.exports = passport;
